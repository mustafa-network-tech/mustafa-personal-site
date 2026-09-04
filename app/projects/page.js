import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import WorkArchive from '@/components/WorkArchive'
import { ALL_PROJECTS } from '@/lib/projects/projectsData'
const meta=PAGE_META.projects.en
export const metadata={title:meta.title,description:meta.description,keywords:GLOBAL_META.en.keywords,alternates:{canonical:'/projects',languages:{en:'/projects',tr:'/tr/projects','x-default':'/tr/projects'}},openGraph:buildOpenGraph({locale:'en',path:'/projects',title:meta.title,description:meta.description,image:OG_IMAGES.en}),twitter:buildTwitterCard({locale:'en',title:meta.title,description:meta.description,image:OG_IMAGES.en})}
export default function ProjectsEn(){return <><JsonLd data={getBreadcrumbListSchema([{name:'Home',url:'/en'},{name:'Projects',url:'/projects'}])}/><WorkArchive projects={ALL_PROJECTS} locale="en"/></>}
