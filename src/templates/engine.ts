export interface Template { id: string; name: string; category: string; content: string; variables: string[]; }
export function renderTemplate(template: Template, values: Record<string, string>): string {
  let result = template.content;
  for (const [key, value] of Object.entries(values)) { result = result.replace(new RegExp({{}}, 'g'), value); }
  return result;
}
export function extractVariables(content: string): string[] {
  const matches = content.match(/\{\{(\w+)\}\}/g);
  return matches ? [...new Set(matches.map(m => m.replace(/[{}]/g, '')))] : [];
}
export const templates: Template[] = [
  { id: 'contract', name: 'Service Agreement', category: 'legal', content: 'This agreement is made between {{company}} and {{client}} effective {{date}}.', variables: ['company', 'client', 'date'] },
  { id: 'invoice', name: 'Invoice', category: 'finance', content: 'INVOICE {{number}}\nClient: {{client}}\nAmount: {{amount}}\nDue: {{dueDate}}', variables: ['number', 'client', 'amount', 'dueDate'] },
  { id: 'nda', name: 'NDA', category: 'legal', content: 'Non-Disclosure Agreement between {{disclosing}} and {{receiving}}.', variables: ['disclosing', 'receiving'] }
];
