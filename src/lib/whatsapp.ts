/** Link do WhatsApp que abre a conversa com a mensagem já escrita (sem integração, só wa.me). */
export function whatsappLink(phone: string, message: string): string {
  if (!/^\d{10,15}$/.test(phone)) throw new Error(`Número de WhatsApp inválido: ${phone}`);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
