import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { TInfoTile } from "@/store/weather";
import { baseStyle } from "@/styles/baseStyle";

type WeatcherInfoTileProps = {
  item: TInfoTile;
  itemWidth: number;
};

export default function WeatcherInfoTile({ item, itemWidth }: WeatcherInfoTileProps) {
  const theme = useTheme();
  return (
    <ThemedView
      style={[
        baseStyle.itemsCenter,
        baseStyle.justifyCenter,
        baseStyle.marginMD,
        baseStyle.roundedLG,
        { backgroundColor: theme.primary },
        { height: itemWidth / 2 },
        { width: itemWidth - baseStyle.marginMD.margin * 2 },
      ]}>
      <ThemedText style={baseStyle.fontMD}>{item.title}</ThemedText>
      <ThemedText>
        {item.info} {item.infoUnit ? item.infoUnit : undefined}{" "}
      </ThemedText>
    </ThemedView>
  );
}
