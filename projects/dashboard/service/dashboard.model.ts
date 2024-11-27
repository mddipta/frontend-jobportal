export interface DashboardResponseDto {
    totalUser: number;
    totalJobTitle: number;
    totalVacancy: number;
    totalOffering: number;
    processSelectionStage: [
        {
            name: string;
            selectionStage: string;
            vacancy: string;
        }
    ];
    jobVacancy: [
        {
            titleJob: string;
            employmentType: string;
            levelExperience: string;
            deadlineApply: string;
        }
    ];
}
