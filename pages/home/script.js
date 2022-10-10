// RESGATA ELEMENTOS DO localStorage
function setDataFromLocalStorage(){
    let LSJobsData = localStorage.getItem("jobsData")
    LSJobsData = JSON.parse(LSJobsData)
    
    if(LSJobsData) {
        jobsData = LSJobsData
    }
    
    let LSAppliedJobsData = localStorage.getItem("appliedJobsData")
    LSAppliedJobsData = JSON.parse(LSAppliedJobsData)
    
    if(LSAppliedJobsData) {
        console.log(appliedJobsData)
        appliedJobsData = LSAppliedJobsData
        console.log(appliedJobsData)
    }

}
setDataFromLocalStorage()



// RENDERIZA OS CARDS DE VAGAS
function renderSpotCard(jobsList) {
    let cardSection = document.querySelector("#card-section")
    cardSection.innerHTML = ""

    jobsList.forEach(job => {
        let btnText = job.applied ? "Remover Candidatura" : "Candidatar"
        
        cardSection.insertAdjacentHTML("beforeend", `
        <div class="card flex-col bgc-white mb-1">
            <h4 class="title-4">${job.title}</h4>
            <pre class="text-3">${job.enterprise}     ${job.location}</pre>
            <p class="text-2">
            ${job.descrition}
            </p>
            <div class="flex spc-btwn">
                <div>
                    <button class="btn-grey-1 mr-5">${job.modalities[0]}</button>
                    <button class="btn-grey-1 mr-5">${job.modalities[1]}</button>
                </div>
                <button class="btn-primary-2 apply-btn" id="${job.id}">${btnText}</button>
            </div>
        </div>
        `)
    })
    applyForJob()
}
renderSpotCard(jobsData)



// APLICAR E REMOVER PARA VAGA
function applyForJob(){
    let applyBtns = document.querySelectorAll(".apply-btn")

    applyBtns.forEach(button => {
        button.addEventListener("click", e => {
            let btnId = e.target.id

            if(jobsData[btnId].applied){
                jobsData[btnId].applied = false
                jobRemoveIndex = appliedJobsData.findIndex(job => job.id == btnId)
                appliedJobsData.splice(jobRemoveIndex, 1)

                let jobsDataJSON = JSON.stringify(jobsData)
                let appliedJobsDataJSON = JSON.stringify(appliedJobsData)
                localStorage.setItem("jobsData", jobsDataJSON)
                localStorage.setItem("appliedJobsData", appliedJobsDataJSON)
            } else {
                jobsData[btnId].applied = true
                appliedJobsData.push(jobsData[btnId])

                let jobsDataJSON = JSON.stringify(jobsData)
                let appliedJobsDataJSON = JSON.stringify(appliedJobsData)
                localStorage.setItem("jobsData", jobsDataJSON)
                localStorage.setItem("appliedJobsData", appliedJobsDataJSON)
            }
            
            renderSpotCard(jobsData)
            renderAppliedJobs(appliedJobsData)
        })
    })

}



// RENDERIZAR VAGAS SELECIONADAS
function renderAppliedJobs(jobsList) {
    let appliedJobsSection = document.querySelector("#applied-jobs-section")
    appliedJobsSection.innerHTML = '<div class="aside-top bgc-white"><h4 class="title-4">Vagas selecionadas</h4></div>'

    if(jobsList.length === 0) {
        appliedJobsSection.insertAdjacentHTML("beforeend", `
        <div class="aside-card flex-col bgc-white">
            <p class="text-2">Você ainda não aplicou para nenhuma vaga</p>
            <div class="flex-col gap-8">
                <div class="bgc-grey-5 block1"></div>
                <div class="bgc-grey-5 block2"></div>
                <div class="flex gap-8">
                    <div class="bgc-grey-5 block3"></div>
                    <div class="bgc-grey-5 block4"></div>
                    <div class="bgc-grey-5 block5"></div>
            </div>
            </div>
        </div>
        `)
    } else {
        jobsList.forEach(({title, enterprise, location, id}) => appliedJobsSection.insertAdjacentHTML("beforeend", `
        <div class="aside-card flex bgc-white">
            <div class="aside-card-info flex-col">
                <h5 class="title-5">${title}</h5>
                <pre class="text-3">${enterprise}      ${location}</pre>
            </div>
            <button class="btn-trash" id="${id}"></button>
        </div>
        `))

        let trashBtns = document.querySelectorAll(".btn-trash")
        trashBtns.forEach(button => button.addEventListener("click", e => {
            let btnId = e.target.id
            jobsData[btnId].applied = false
            jobRemoveIndex = appliedJobsData.findIndex(job => job.id == btnId)
            appliedJobsData.splice(jobRemoveIndex, 1)
            renderAppliedJobs(appliedJobsData)
            renderSpotCard(jobsData)
            
            let jobsDataJSON = JSON.stringify(jobsData)
            let appliedJobsDataJSON = JSON.stringify(appliedJobsData)
            localStorage.setItem("jobsData", jobsDataJSON)
            localStorage.setItem("appliedJobsData", appliedJobsDataJSON)
        }))
    }

}
renderAppliedJobs(appliedJobsData)