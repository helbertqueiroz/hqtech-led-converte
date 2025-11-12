import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormData {
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  igreja: string;
  telefone: string;
  comoConheceu: string;
  mensagem?: string;
  aceitaPrivacidade: boolean;
  hutk?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log("Form data received:", formData);

    const hubspotToken = Deno.env.get("HUBSPOT_PRIVATE_APP_TOKEN");
    if (!hubspotToken) {
      throw new Error("HUBSPOT_PRIVATE_APP_TOKEN not configured");
    }

    const portalId = "43624841";
    const formGuid = "e73a190c-dfa0-4352-b864-39ba9bdb537a";
    
    const fields = [
      { name: "firstname", value: formData.nome.split(" ")[0] },
      { name: "lastname", value: formData.nome.split(" ").slice(1).join(" ") || formData.nome.split(" ")[0] },
      { name: "email", value: formData.email },
      { name: "city", value: formData.cidade },
      { name: "state", value: formData.estado },
      { name: "company", value: formData.igreja },
      { name: "phone", value: formData.telefone },
      { name: "como_conheceu_a_hq_tech_", value: formData.comoConheceu },
    ];

    if (formData.mensagem) {
      fields.push({ name: "message", value: formData.mensagem });
    }

    const payload: any = {
      fields,
      context: {
        pageUri: req.headers.get("referer") || "https://hqtech.com.br",
        pageName: "Orçamento de Painéis de LED para Igrejas",
      },
    };

    if (formData.hutk) {
      payload.context.hutk = formData.hutk;
    }

    if (formData.aceitaPrivacidade) {
      payload.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: "Li e aceito a Política de Privacidade",
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text: "Aceito receber comunicações da HQ Tech",
            },
          ],
        },
      };
    }

    console.log("Sending to HubSpot:", JSON.stringify(payload, null, 2));

    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseText = await hubspotResponse.text();
    console.log("HubSpot response status:", hubspotResponse.status);
    console.log("HubSpot response:", responseText);

    if (!hubspotResponse.ok) {
      throw new Error(`HubSpot API error: ${responseText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Formulário enviado com sucesso!" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in hubspot-led-igrejas function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erro ao enviar formulário" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
