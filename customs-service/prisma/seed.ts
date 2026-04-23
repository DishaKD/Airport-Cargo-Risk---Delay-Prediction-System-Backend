import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing records
  await prisma.clearanceRecord.deleteMany();
  console.log('✓ Cleared existing records');

  // Create sample clearance records
  const clearance1 = await prisma.clearanceRecord.create({
    data: {
      cargoId: 'CARGO-001',
      clearanceStatus: 'PENDING',
      riskLevel: 'LOW',
      notes: 'Initial submission',
      delayReason: null,
      inspectionDate: null,
    },
  });

  const clearance2 = await prisma.clearanceRecord.create({
    data: {
      cargoId: 'CARGO-002',
      clearanceStatus: 'UNDER_INSPECTION',
      riskLevel: 'MEDIUM',
      notes: 'Random inspection required',
      delayReason: null,
      inspectionDate: new Date(),
    },
  });

  const clearance3 = await prisma.clearanceRecord.create({
    data: {
      cargoId: 'CARGO-003',
      clearanceStatus: 'HOLD',
      riskLevel: 'HIGH',
      notes: 'High-risk cargo from restricted country',
      delayReason: 'Missing documentation',
      inspectionDate: null,
    },
  });

  const clearance4 = await prisma.clearanceRecord.create({
    data: {
      cargoId: 'CARGO-004',
      clearanceStatus: 'CLEARED',
      riskLevel: 'LOW',
      notes: 'Inspection completed successfully',
      delayReason: null,
      inspectionDate: new Date(),
    },
  });

  console.log('✓ Created sample records:');
  console.log(`  - ${clearance1.id} (${clearance1.cargoId})`);
  console.log(`  - ${clearance2.id} (${clearance2.cargoId})`);
  console.log(`  - ${clearance3.id} (${clearance3.cargoId})`);
  console.log(`  - ${clearance4.id} (${clearance4.cargoId})`);

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
