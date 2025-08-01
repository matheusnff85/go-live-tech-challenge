import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seeding...");

  // Senha padrão para todos os usuários
  const defaultPassword = "senha123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // 1. Criar Administrador
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Administrador",
      password: hashedPassword,
      role: Role.administrador,
    },
  });

  // 2. Criar Editor
  await prisma.user.upsert({
    where: { email: "editor@example.com" },
    update: {},
    create: {
      email: "editor@example.com",
      name: "Editor",
      password: hashedPassword,
      role: Role.editor,
    },
  });

  // 3. Criar Leitor
  await prisma.user.upsert({
    where: { email: "leitor@example.com" },
    update: {},
    create: {
      email: "leitor@example.com",
      name: "Leitor",
      password: hashedPassword,
      role: Role.leitor,
    },
  });

  console.log("Seeding concluído com sucesso!");
  console.log(`Usuários criados com a senha padrão: "${defaultPassword}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
