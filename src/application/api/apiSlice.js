import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/delete-background/", // MockApi "https://662e73e9a7dda1fa378d0185.mockapi.io/api/v1/",
	}),

	endpoints: builder => ({
		// -- login user mutation
		login: builder.mutation({
			query: credentials => ({
				url: `usuarios/login`,
				method: "POST",
				body: credentials,
			}),
		}),
		// -- sign-in user mutation
		signIn: builder.mutation({
			query: credentials => ({
				url: `usuarios/registro`,
				method: "POST",
				body: credentials,
				headers: {
					"Access-Control-Allow-Origin": "http://localhost:3000",
				},
			}),
		}),
		// delete background api
		deleteBackgroundFromUrl: builder.mutation({
			query: video => ({
				url: `url`,
				method: "POST",
				body: {
					input: video,
				},
				headers: {
					"Access-Control-Allow-Origin": "http://localhost:3000",
				},
			}),
		}),
		deleteBackgroundFromFile: builder.mutation({
			query: video => {
				// set the form data
				var bodyFormData = new FormData();
				bodyFormData.append("video", video);
				console.log({ bodyFormData, video });
				// return object
				return {
					url: `file`,
					method: "POST",
					formData: true,
					body: bodyFormData,
					headers: {
						"Access-Control-Allow-Origin": "http://localhost:3000",
					},
				};
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignInMutation,
	useDeleteBackgroundFromUrlMutation,
	useDeleteBackgroundFromFileMutation,
} = apiSlice;
