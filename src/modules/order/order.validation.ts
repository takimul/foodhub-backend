// import { z } from "zod";

// export const createOrderSchema = z.object({
//   body: z.object({
//     address: z.string().min(5),
//     items: z
//       .array(
//         z.object({
//           mealId: z.string(),
//           quantity: z.number().min(1),
//         }),
//       )
//       .min(1, "At least one item required"),
//   }),
// });

import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    address: z.string().min(5, "Address is required"),
  }),
});
