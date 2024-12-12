export async function getData (endpoint, endpointParams, response) {
  if(!endpointParams || !Array.isArray(endpointParams)) {
    endpointParams = []
  }

  response.value.isLoading = true
  try {
    response.value.data = await endpoint(...endpointParams)
    response.value.error = null
  } catch (e) {
    response.value.data = null
    response.value.error = 'Błąd podczas pobierania danych'
    console.log(`get data: ${e}`)
  } finally {
    response.value.isLoading = false
  }
}
