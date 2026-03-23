	export async function getWeatherString() {
		const lat = 18.4655;
		const lon = -66.1057;

		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America%2FPuerto_Rico`;

		const res = await fetch(url);
		const data = await res.json();

		const temp = Math.round(data.current.temperature_2m);
		const code = data.current.weathercode;
		const hour = new Date().toLocaleString("en-US", {
			timeZone: "America/Puerto_Rico",
			hour: "numeric",
			hour12: false,
		});
		const h = parseInt(hour);

		const isNight = h < 6 || h >= 20;
		const isEvening = h >= 17 && h < 20;
		const isMorning = h >= 6 && h < 11;

		const timeLabel = isNight ? "night" : isEvening ? "evening" : isMorning ? "morning" : "afternoon";

		// WMO weather codes → description + emoji
		const getCondition = (code, night) => {
			if (code === 0)  return night ? ["The sky is clear", "🌙"] : ["Clear skies, the sun is shining bright", "☀️"];
			if (code === 1)  return ["Mostly clear skies", night ? "🌙" : "🌤️"];
			if (code === 2)  return ["Partly cloudy", "⛅"];
			if (code === 3)  return ["Overcast and cloudy", "☁️"];
			if ([45, 48].includes(code)) return ["Foggy out there", "🌫️"];
			if ([51, 53, 55].includes(code)) return ["A light drizzle is falling", "🌦️"];
			if ([61, 63, 65].includes(code)) return ["It's raining", "🌧️"];
			if ([71, 73, 75, 77].includes(code)) return ["Snow is falling", "❄️"]; // unlikely but complete
			if ([80, 81, 82].includes(code)) return ["Rain showers passing through", "🌦️"];
			if ([95, 96, 99].includes(code)) return ["There's a thunderstorm rolling in", "⛈️"];
			return ["Interesting skies", "🌡️"];
		};

		const [description, emoji] = getCondition(code, isNight);

		return `${description} this beautiful ${timeLabel}. San Juan, Puerto Rico. ${temp}°F. ${emoji}`;
	}