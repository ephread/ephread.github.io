import type { ImageMetadata } from "astro";

import azure from "../assets/images/azure-icon.svg";
import bluetooth from "../assets/images/bluetooth-icon.svg";
import cSharp from "../assets/images/c-sharp-icon.svg";
import coreData from "../assets/images/core-data-icon.svg";
import firebase from "../assets/images/firebase-icon.svg";
import gdscript from "../assets/images/gdscript-icon.svg";
import graphql from "../assets/images/graphql-icon.svg";
import grdb from "../assets/images/grdb-icon.svg";
import javascript from "../assets/images/javascript-icon.svg";
import jetpackCompose from "../assets/images/jetpack-compose-icon.svg";
import kotlin from "../assets/images/kotlin-icon.svg";
import node from "../assets/images/node-icon.svg";
import objectiveC from "../assets/images/objective-c-icon.svg";
import parse from "../assets/images/parse-icon.svg";
import realm from "../assets/images/realm-icon.svg";
import sketch from "../assets/images/sketch-icon.svg";
import svg from "../assets/images/svg-icon.svg";
import swift from "../assets/images/swift-icon.svg";
import swiftUI from "../assets/images/swift-ui-icon.svg";
import typescript from "../assets/images/typescript-icon.svg";
import uikit from "../assets/images/uikit-icon.svg";
import watchkit from "../assets/images/watchkit-icon.svg";
import yaml from "../assets/images/yaml-icon.svg";

/** Technologies listed in project showcases, keyed by the id used in frontmatter. */
export const technologies = {
  azure: { label: "Azure", icon: azure },
  bluetooth: { label: "Bluetooth Low Energy", icon: bluetooth },
  "c-sharp": { label: "C#", icon: cSharp },
  "core-data": { label: "Core Data", icon: coreData },
  firebase: { label: "Firebase", icon: firebase },
  gdscript: { label: "GDScript", icon: gdscript },
  graphql: { label: "GraphQL", icon: graphql },
  grdb: { label: "SQLite with GRDB", icon: grdb },
  javascript: { label: "JavaScript", icon: javascript },
  "jetpack-compose": { label: "Jetpack Compose", icon: jetpackCompose },
  kotlin: { label: "Kotlin", icon: kotlin },
  "node-js": { label: "Node.js", icon: node },
  "objective-c": { label: "Objective-C", icon: objectiveC },
  parse: { label: "Parse", icon: parse },
  realm: { label: "Realm", icon: realm },
  sketch: { label: "Sketch", icon: sketch },
  svg: { label: "SVG", icon: svg },
  swift: { label: "Swift", icon: swift },
  "swift-ui": { label: "SwiftUI", icon: swiftUI },
  typescript: { label: "TypeScript", icon: typescript },
  uikit: { label: "UIKit", icon: uikit },
  watchkit: { label: "WatchKit", icon: watchkit },
  yaml: { label: "YAML", icon: yaml },
} satisfies Record<string, { label: string; icon: ImageMetadata }>;

export type Technology = keyof typeof technologies;

export const technologyIds = Object.keys(technologies) as [Technology, ...Technology[]];
