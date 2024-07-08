import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/atom-ai/sample-voice/", // MockApi "https://662e73e9a7dda1fa378d0185.mockapi.io/api/v1/",
	}),

	endpoints: builder => ({
		// atom ai
		talkToAtom: builder.mutation({
			query: audio => {
				// set the form data
				var bodyFormData = new FormData();
				bodyFormData.append("user_prompt", audio);

				// return object
				return {
					url: "",
					method: "POST",
					formData: true,
					body: bodyFormData,
					headers: {
						"Access-Control-Allow-Origin": "http://localhost:8000",
					},
				};
			},
		}),
	}),
});

export const { useTalkToAtomMutation } = apiSlice;
