# Building a Simple Engine: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [A New Learning Approach](#_a_new_learning_approach)
- [A_New_Learning_Approach](#_a_new_learning_approach)
- [What to Expect](#_what_to_expect)
- [What_to_Expect](#_what_to_expect)
- [How to Use This Tutorial](#_how_to_use_this_tutorial)
- [How_to_Use_This_Tutorial](#_how_to_use_this_tutorial)
- [Getting Started with Example Assets](#_getting_started_with_example_assets)
- [Getting_Started_with_Example_Assets](#_getting_started_with_example_assets)

## Content

Welcome to the "Building a Simple Engine" tutorial series! This series marks a transition from the foundational Vulkan concepts covered in the previous chapters to a more structured approach focused on building a reusable rendering engine.

While the previous tutorial series focused on introducing individual Vulkan concepts step by step, this series takes a different approach:

This series targets readers who have completed the [Vulkan Tutorial](../00_Introduction.html) and feel comfortable with the fundamentals. We’ll emphasize architectural concepts and design patterns over exhaustive API permutations, so you develop an engine mindset rather than a collection of snippets. Expect to do more independent work: fill in smaller gaps, experiment, and lean on the [Vulkan Guide](https://docs.vulkan.org/guide/latest/), [Samples](https://docs.vulkan.org/samples/latest/), and [Specification](https://docs.vulkan.org/spec/latest/) as primary references. If a topic feels too advanced, revisit the original tutorial and return when ready.

The "Building a Simple Engine" series is designed as a starting point for your journey into engine development, not a finishing point. We’ll cover:

**Engine Architecture** - How to structure your code for flexibility, maintainability, and extensibility.

**Resource Management** - More sophisticated approaches to handling models, textures, and other assets.

**Rendering Techniques** - Implementation of modern rendering approaches within an engine framework.

**Performance Considerations** - How to design your engine with performance in mind.

**Publication Considerations** - How to prepare your application for distribution in a professional environment, including packaging, deployment, and platform-specific considerations.

Throughout this series, we encourage you to experiment, extend the provided examples, and even challenge some of our design decisions. The best way to learn engine development is by doing, and sometimes by making (and learning from) mistakes.

Throughout our engine implementation, we’re using vk::raii dynamic rendering and C20 modules. The vk::raii namespace provides Resource Acquisition Is Initialization (RAII) wrappers for Vulkan objects, which helps with resource management and makes the code cleaner. Dynamic rendering simplifies the rendering process by eliminating the need for explicit render passes and framebuffers. C20 modules improve code organization, compilation times, and encapsulation compared to traditional header files.

Each chapter builds on the last to assemble a small but capable engine. Read a chapter end‑to‑end first, then implement; pause to internalize the concepts; and don’t hesitate to revisit the original Vulkan tutorial when you need a refresher. Treat the code as a starting point—experiment and extend it with your own features.

Let’s begin our journey into engine development with these chapters:

[Engine Architecture](Engine_Architecture/01_introduction.html) - How to structure your code for flexibility, maintainability, and extensibility.

[Camera Transformations](Camera_Transformations/01_introduction.html) - Implementation of camera systems and transformations.

[Lighting & Materials](Lighting_Materials/01_introduction.html) - Basic lighting models and push constants.

[GUI](GUI/01_introduction.html) - Implementation of a graphical user interface using Dear ImGui.

[Loading Models](Loading_Models/01_introduction.html) - More sophisticated approaches to handling models, textures, and other assets.

[Subsystems](Subsystems/01_introduction.html) - Implementation of Audio and Physics subsystems with Vulkan compute capabilities.

[Tooling](Tooling/01_introduction.html) - CI/CD, Debugging, Crash minidump, Distribution, and Vulkan extensions for robustness.

[Mobile Development](Mobile_Development/01_introduction.html) - Adapting the engine for Android/iOS, focusing on performance considerations and mobile-specific Vulkan extensions.

[Advanced Topics](Advanced_Topics/01_introduction.html) - Short, focused tutorials that extend the Simple Engine with specific features and optimizations.

[Previous: Main Tutorial Conclusion](../conclusion.html) | [Next: Engine Architecture](Engine_Architecture/01_introduction.html)

To follow along with the attachments-based Simple Engine examples and scenes, fetch the Bistro assets locally.

![The Bistro scene - a detailed outdoor café environment demonstrating the engine’s rendering capabilities](../_images/images/MainEntry.png)

* 
Linux/macOS (default target: attachments/simple_engine/Assets/bistro at repository root):

$ cd attachments/simple_engine
$ ./fetch_bistro_assets.sh

* 
Windows (default target: attachments\simple_engine\Assets\bistro at repository root):

> cd attachments\simple_engine
> fetch_bistro_assets.bat

The scripts use SSH ([git@github.com](mailto:git@github.com):gpx1000/bistro.git) and fall back to HTTPS if SSH is unavailable. If Git LFS is installed, large files will be pulled automatically.

Next, take advantage of the install_dependencies_* scripts to ensure you have all necessary dependencies.

Once assets are available and dependencies are ready, build and run the Simple Engine examples under attachments/simple_engine. See the later chapters for details on scene loading and subsystems referenced by the example code.
