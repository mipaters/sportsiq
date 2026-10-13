import { PageHead } from '../components/PageHead';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export function Architecture() {
  return (
    <>
      <PageHead eyebrow="ARCHITECTURE" title="Microsoft architecture for SportsIQ" level={0}
        sub="Signals flow through Microsoft Fabric and Foundry into the SportsIQ agent framework, through governance to action channels, and back into organizational memory." />
      <ArchitectureDiagram />
    </>
  );
}
