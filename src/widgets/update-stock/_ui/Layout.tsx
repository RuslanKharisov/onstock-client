export function Layout ({updateFromFile, updateFromForm}:{updateFromFile?: React.ReactNode, updateFromForm: React.ReactNode}){
    return (
        <section className="flex items-start flex-col md:flex-row gap-5">
            {updateFromForm}
            {updateFromFile}
        </section>
    )
}