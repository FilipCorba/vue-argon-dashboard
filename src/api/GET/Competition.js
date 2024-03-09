import ApiCompetitionFlowManager from "../apiManager";


export async function getTimetable() {
  try {
    const response = await ApiCompetitionFlowManager.get(
      `/api/v1/competitions/6/harmonograms?day=1`
    );
    console.log("Timetable data" + response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
