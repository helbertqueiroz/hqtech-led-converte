import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const formSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório").max(100),
  email: z.string().email("Email inválido").max(255),
  cidade: z.string().min(2, "Cidade é obrigatória").max(100),
  estado: z.string().min(2, "Estado é obrigatório"),
  igreja: z.string().min(2, "Nome da igreja é obrigatório").max(150),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").max(20),
  comoConheceu: z.string().min(1, "Por favor, selecione uma opção"),
  mensagem: z.string().max(1000).optional(),
  aceitaPrivacidade: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar a Política de Privacidade",
  }),
  captcha: z.string().min(1, "Por favor, responda a pergunta de segurança"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { question: `Quanto é ${num1} + ${num2}?`, answer: String(num1 + num2) };
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      cidade: "",
      estado: "",
      igreja: "",
      telefone: "",
      comoConheceu: "",
      mensagem: "",
      aceitaPrivacidade: false,
      captcha: "",
    },
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, p1, p2, p3) => {
        let formatted = `(${p1})`;
        if (p2) formatted += ` ${p2}`;
        if (p3) formatted += `-${p3}`;
        return formatted;
      });
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, p1, p2, p3) => {
      let formatted = `(${p1})`;
      if (p2) formatted += ` ${p2}`;
      if (p3) formatted += `-${p3}`;
      return formatted;
    });
  };

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  const onSubmit = async (data: FormData) => {
    if (data.captcha !== captchaQuestion.answer) {
      toast({
        title: "Resposta incorreta",
        description: "Por favor, responda corretamente à pergunta de segurança.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const hutk = getCookie("hubspotutk");
      
      const { data: response, error } = await supabase.functions.invoke(
        "hubspot-led-igrejas",
        {
          body: {
            ...data,
            hutk,
          },
        }
      );

      if (error) throw error;

      if (response?.success) {
        toast({
          title: "Formulário enviado!",
          description: "Em breve nossa equipe entrará em contato.",
        });
        form.reset();
      } else {
        throw new Error(response?.error || "Erro ao enviar formulário");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="orcamento" className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Solicite seu <span className="text-gradient">orçamento</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário e nossa equipe entrará em contato com uma proposta personalizada
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-medium p-6 md:p-8 border border-border/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="joao@igreja.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="São Paulo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {estadosBrasileiros.map((estado) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="igreja"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Igreja *</FormLabel>
                      <FormControl>
                        <Input placeholder="Igreja Exemplo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (WhatsApp) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 00000-0000"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comoConheceu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Como conheceu a HQ Tech? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Indicação">Indicação</SelectItem>
                          <SelectItem value="Evento">Evento</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte-nos mais sobre suas necessidades..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aceitaPrivacidade"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Li e aceito as{" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="text-primary hover:underline font-medium"
                              >
                                políticas de privacidade
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold mb-4">
                                  Política de Privacidade – LGPD
                                </DialogTitle>
                                <DialogDescription className="text-left space-y-4 text-base">
                                  <p>
                                    Nós, da HQ Tech, respeitamos a sua privacidade e garantimos que seus dados serão tratados com segurança e transparência. As informações coletadas neste formulário serão utilizadas exclusivamente para contato comercial, envio de propostas e comunicações relacionadas aos nossos serviços.
                                  </p>
                                  
                                  <div>
                                    <h3 className="font-semibold text-lg mb-2 text-foreground">Como protegemos seus dados:</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                      <li>Não compartilhamos suas informações com terceiros sem sua autorização.</li>
                                      <li>Utilizamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados.</li>
                                      <li>Você pode solicitar a exclusão ou atualização dos seus dados a qualquer momento.</li>
                                    </ul>
                                  </div>
                                  
                                  <p className="pt-4 border-t">
                                    Ao marcar "Li e aceito", você concorda com o tratamento dos seus dados conforme descrito nesta política, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                                  </p>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                          {" *"}
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pergunta de segurança: {captchaQuestion.question} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite sua resposta"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                </Button>
              </form>
            </Form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Seus dados estão seguros conosco e não serão compartilhados com terceiros
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
