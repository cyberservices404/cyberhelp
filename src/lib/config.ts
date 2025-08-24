import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { SiteConfig } from './types';

export function getSiteConfig(): SiteConfig {
  const configPath = path.join(process.cwd(), 'data', 'site-config.yaml');
  const fileContents = fs.readFileSync(configPath, 'utf8');
  return yaml.load(fileContents) as SiteConfig;
}
