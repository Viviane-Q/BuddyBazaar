
import { MD3LightTheme as DefaultTheme} from 'react-native-paper';
import Category from './entities/Category';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#3D5B5C",
		primaryContainer: "#fffdf1",
		secondary: "#69857A",
		secondaryContainer: "#E0F2F1",
		tertiary: "#EA9B3F",
		tertiaryContainer: "#FFF8E1",
		surface: "#FFFFFF",
		surfaceVariant: "#F5F5F5",
		surfaceDisabled: "#E0E0E0",
		background: "#FFF8E1",
		error: "#F44336",
		errorContainer: "#FFEBEE",
		onPrimary: "#FFFFFF",
		onPrimaryContainer: "#000000",
		onSecondary: "#FFFFFF",
		onSecondaryContainer: "#000000",
		onTertiary: "#212121",
		onTertiaryContainer: "#FFFFFF",
		onSurface: "#212121",
		onSurfaceVariant: "#212121",
		onSurfaceDisabled: "#9E9E9E",
		onError: "#FFFFFF",
		onErrorContainer: "#212121",
		onBackground: "#212121",
		outline: "#BDBDBD",
		outlineVariant: "#EEEEEE",
		inverseSurface: "#000000",
		inverseOnSurface: "#FFFFFF",
		inversePrimary: "#FFFFFF",
		shadow: "#0000001A",
		scrim: "#00000099",
		backdrop: "#000000CC",
		categories: {
			[Category.Sport]: '#c48a7c',
			[Category.Book]: '#d5a65c',
			[Category.Art]: '#ccc47e',
			[Category.Pub]: '#A4A663',
			[Category.Cinema]: '#7E998C',
			[Category.BoardGame]: '#88ACCC',
			[Category.Musique]: '#6b81ac',
			[Category.ManualWork]: '#a28291',
			[Category.Other]: '#999393',
		}
	}
}

export default theme;