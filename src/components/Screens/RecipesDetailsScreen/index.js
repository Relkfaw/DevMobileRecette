import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchSelectedRecipe } from "../../../api/recipes";
import { getSelectedRecipe } from "../../../redux/selectors";

const RecipesDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;

  console.log("id = ", id);
  const dispatch = useDispatch();

  const recipe = useSelector(getSelectedRecipe);
  useEffect(() => {
    fetchSelectedRecipe(dispatch, id);
  }, []);

  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image
          source={{ uri: recipe.image }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>
      <View>
        <Text style={styles.title}>List of Ingredient</Text>
        {recipe.extendedIngredients &&
          recipe.extendedIngredients.map((ing) => {
            return (
              <Text style={styles.ing} key={ing.id}>
                {ing.original}
              </Text>
            );
          })}
      </View>
      <Text style={styles.title}>Detailed Instruction</Text>
      {recipe.analyzedInstructions &&
        recipe.analyzedInstructions[0].steps
          .sort((instructa, instructb) => instructa.number - instructb.number)
          .map((instruction) => {
            return (
              <Text style={styles.ing} key={instruction.number}>
                {`${instruction.step}\n`}
              </Text>
            );
          })}
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    height: 200,
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 10,
  },
  containerIngredients: {
    borderTopWidth: 1,
    borderTopColor: "lightgreen",
    borderBottomWidth: 1,
    borderBottomColor: "lightgreen",
    padding: 15,
  },
  ing: {
    fontSize: 16,
  },
});

export default RecipesDetailsScreen;
