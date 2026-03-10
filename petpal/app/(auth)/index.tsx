import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

// ... (keep your existing imports)

export default function Onboarding() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Track Health",
      description: "Keep all vaccination records, medicines & vet notes in one place",
      // image: <PawPlaceholder /> or real later
    },
    {
      title: "Book Vets Easily",
      description: "Find nearby clinics, check availability & book in seconds",
    },
    {
      title: "Join Pet Community",
      description: "Share cute photos, ask advice & help lost pets find home",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const skipOnboarding = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Logo & tagline at top */}
      <View style={styles.header}>
        <Text style={styles.logo}>PetPal</Text>
        <Text style={styles.tagline}>One App for All Your Pet Needs</Text>
      </View>

      {/* Slide content - center */}
    <View style={styles.content}>
    {/* Placeholder for pet image */}
    <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>🐾</Text>
    </View>

    <Text style={styles.title}>{slides[currentSlide].title}</Text>
    <Text style={styles.description}>{slides[currentSlide].description}</Text>
    </View>

      {/* Bottom controls */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={skipOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C42',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 52,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  imageText: {
    fontSize: 120,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 28,
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FF8C42',
    fontSize: 18,
    fontWeight: '700',
  },
});