import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export const theme = useTheme([
	getTheme(),
	{
		Table: `
        --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
      `,
	},
]);
