#!/usr/bin/env node

import 'reflect-metadata';
import dataSource from '../config/db';
import { seedDatabase, clearDatabase } from '../config/seed';

async function runSeed() {
  console.log('🚀 Starting manual database seed...');
  
  try {
    // Initialize database connection
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('✅ Database connection established');
    }

    // Check command line arguments
    const args = process.argv.slice(2);
    const shouldClear = args.includes('--clear') || args.includes('-c');
    const shouldSeed = !args.includes('--clear-only');

    if (shouldClear) {
      await clearDatabase(dataSource);
    }

    if (shouldSeed) {
      await seedDatabase(dataSource);
    }

    console.log('🎉 Manual seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Manual seed failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('👋 Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seed if this file is executed directly
if (require.main === module) {
  runSeed();
}