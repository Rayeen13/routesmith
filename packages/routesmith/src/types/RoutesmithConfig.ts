export interface RoutesmithConfig {
  screensDir: string;
  output: string;

  naming?: {
    removeSuffix?: string;
    routeCase?: "pascal" | "camel";
  };

  router?: {
    enabled?: boolean;
    style?: "camel" | "pascal" | "to";
  };
}
