export function formatUsername(user: { name: string; discriminator: string }) {
  return `${user.name}#${user.discriminator}`;
} 