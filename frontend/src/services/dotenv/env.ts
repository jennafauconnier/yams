import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const localConfigPath = [__dirname, '../.env.local'].join('/')

try {
  const envConfig = dotenv.parse(fs.readFileSync(localConfigPath))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
  // eslint-disable-next-line no-empty
} catch (e) {}
