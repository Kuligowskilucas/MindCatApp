import { getMoods, MoodEntry } from "@/src/services/mood";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const moodEmojis: Record<number, string> = {
  1: "😡",
  2: "😢",
  3: "😐",
  4: "😊",
  5: "😄",
};

const moodColors: Record<number, string> = {
  1: "#E74C3C",
  2: "#E67E22",
  3: "#F1C40F",
  4: "#2ECC71",
  5: "#27AE60",
};

function getLast7Days(): { label: string; dateStr: string }[] {
  const days = [];
  const names = ["D", "S", "T", "Q", "Q", "S", "S"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: i === 0 ? "Hoje" : names[d.getDay()],
      dateStr: d.toISOString().split("T")[0],
    });
  }
  return days;
}

export default function MoodChart({ refreshKey }: { refreshKey?: number }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const days = getLast7Days();
        const from = days[0].dateStr;
        const to = days[days.length - 1].dateStr + "T23:59:59";
        const data = await getMoods(from, to);
        setMoods(data);
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  const days = getLast7Days();

  const moodByDate: Record<string, number> = {};
  moods.forEach((m) => {
    const date = m.recorded_at.split("T")[0];
    moodByDate[date] = m.mood_level;
  });

  const hasAnyMood = Object.keys(moodByDate).length > 0;

  if (!hasAnyMood) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📊</Text>
        <Text style={styles.emptyText}>
          Nenhum humor registrado ainda.{"\n"}Registre como você está se sentindo!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimos 7 dias</Text>
      <View style={styles.chartRow}>
        {days.map((day) => {
          const level = moodByDate[day.dateStr];
          const barHeight = level ? (level / 5) * 60 : 4;
          const barColor = level ? moodColors[level] : "rgba(255,255,255,0.2)";

          return (
            <View key={day.dateStr} style={styles.barColumn}>
              {level ? (
                <Text style={styles.emoji}>{moodEmojis[level]}</Text>
              ) : (
                <View style={{ height: 20 }} />
              )}
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: barHeight, backgroundColor: barColor },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{day.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 4,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.7,
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 110,
    paddingHorizontal: 4,
  },
  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: 36,
  },
  emoji: {
    fontSize: 14,
    marginBottom: 4,
  },
  barTrack: {
    width: 16,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 8,
  },
  dayLabel: {
    color: "#fff",
    fontSize: 11,
    marginTop: 6,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 12,
  },
  emptyEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  emptyText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },
});