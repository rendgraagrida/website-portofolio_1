import { join } from 'path';

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Harap berikan nama komponen: bun run create-component <NamaKomponen>');
  process.exit(1);
}

const template = `
import React from 'react';

interface ${componentName}Props {
  // Define props here
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div className="p-4 rounded-xl">
      <h2>${componentName}</h2>
    </div>
  );
};
`;

const filepath = join(process.cwd(), 'src', 'components', `${componentName}.tsx`);
await Bun.write(filepath, template.trim());
console.log(`✅ Komponen ${componentName} berhasil dibuat di ${filepath}`);
