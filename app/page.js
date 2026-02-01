// app/page.js

import Identity from "../components/Identity";
import TelekomInfrastructure from "../components/TelekomInfrastructure";
import TechnicalNarrative from "../components/TechnicalNarrative";
import SoftwareDigital from "../components/SoftwareDigital";
import Photography from "../components/Photography";
import WorkingPrinciples from "../components/WorkingPrinciples";

export default function Home() {
  return (
    <>
     { <Identity />}
    {  <TelekomInfrastructure />}
    {  <TechnicalNarrative />}
     { <SoftwareDigital />}
     { <Photography />}
     { <WorkingPrinciples />}
    </>
  );
}