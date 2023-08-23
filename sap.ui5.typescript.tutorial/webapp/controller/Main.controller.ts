import { InputBase$ChangeEvent } from "sap/m/InputBase";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";

type WeatherInfo = {
	current_weather: {
		temperature: number,
		windspeed: number,
		winddirection: number
	}
}

/**
 * @namespace sap.ui5.typescript.tutorial.controller
 */
export default class Main extends BaseController {
	onInit(): void {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();
	}

	async loadWeatherData(lat = "49.31", lon = "8.64") { // default coordinates: Walldorf
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
		const jsonData = await response.json() as WeatherInfo;
		(this.getModel() as JSONModel).setData(jsonData);
	}

	locationChange(evt: InputBase$ChangeEvent) {
		const location = evt.getParameters().value;
	}
}
