import { PAGE_META, OG_IMAGES, GLOBAL_META } from '@/seo/metadata'
import { buildOpenGraph, buildTwitterCard } from '@/seo/openGraph'
import { getBreadcrumbListSchema } from '@/seo/schema'
import JsonLd from '@/components/JsonLd'
import WorkArchive from '@/components/WorkArchive'
import { ALL_PROJECTS } from '@/lib/projects/projectsData'
const meta=PAGE_META.projects.tr
export const metadata={title:meta.title,description:meta.description,keywords:GLOBAL_META.tr.keywords,alternates:{canonical:'/tr/projects',languages:{tr:'/tr/projects',en:'/projects','x-default':'/tr/projects'}},openGraph:buildOpenGraph({locale:'tr',path:'/tr/projects',title:meta.title,description:meta.description,image:OG_IMAGES.tr}),twitter:buildTwitterCard({locale:'tr',title:meta.title,description:meta.description,image:OG_IMAGES.tr})}
export default function ProjectsTr(){return <><JsonLd data={getBreadcrumbListSchema([{name:'Ana sayfa',url:'/tr'},{name:'Projeler',url:'/tr/projects'}])}/><WorkArchive projects={ALL_PROJECTS} locale="tr"/></>}
