# Introduction to Lighting & Materials

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Lighting_Materials/01_introduction.html

## Table of Contents

- [Why Lighting Matters](#_why_lighting_matters)
- [Why_Lighting_Matters](#_why_lighting_matters)
- [Physically Based Rendering (PBR)](#_physically_based_rendering_pbr)
- [Physically_Based_Rendering_(PBR)](#_physically_based_rendering_pbr)
- [Introduction to PBR](#_introduction_to_pbr)
- [Introduction_to_PBR](#_introduction_to_pbr)
- [The Evolution of Real-Time Rendering](#_the_evolution_of_real_time_rendering)
- [The_Evolution_of_Real-Time_Rendering](#_the_evolution_of_real_time_rendering)
- [Core Principles of PBR](#_core_principles_of_pbr)
- [Core_Principles_of_PBR](#_core_principles_of_pbr)
- [Energy Conservation](#_energy_conservation)
- [Microfacet Theory](#_microfacet_theory)
- [Fresnel Effect](#_fresnel_effect)
- [Metallic-Roughness Workflow](#_metallic_roughness_workflow)
- [The BRDF in PBR](#_the_brdf_in_pbr)
- [The_BRDF_in_PBR](#_the_brdf_in_pbr)
- [Diffuse BRDF](#_diffuse_brdf)
- [Specular BRDF](#_specular_brdf)
- [Materials in Computer Graphics](#_materials_in_computer_graphics)
- [Materials_in_Computer_Graphics](#_materials_in_computer_graphics)
- [Material Properties](#_material_properties)
- [Common Material Types](#_common_material_types)
- [Common_Material_Types](#_common_material_types)
- [Push Constants for Material Properties](#_push_constants_for_material_properties)
- [Push_Constants_for_Material_Properties](#_push_constants_for_material_properties)
- [What You’ll Learn](#_what_youll_learn)
- [What_You’ll_Learn](#_what_youll_learn)

## Content

In this chapter, we’ll explore the fundamentals of lighting and materials in 3D rendering, with a focus on Physically Based Rendering (PBR). Lighting is a crucial aspect of creating realistic and visually appealing 3D scenes. Without proper lighting, even the most detailed models can appear flat and lifeless.

![Rendering the Bistro scene at night with PBR pass](../../_images/images/bistro.png)

|  | **About PBR References**: Throughout this tutorial, you may encounter references to PBR (Physically Based Rendering) before reaching this chapter. PBR is a modern rendering approach that simulates how light interacts with surfaces based on physical principles. We’ll cover PBR in detail in the sections that follow, so don’t worry if you’re not familiar with these concepts yet. |
| --- | --- |

This chapter serves as the foundation for understanding how light interacts with different materials in a physically accurate way. The concepts you’ll learn here will be applied in later chapters, including the Loading_Models chapter where we’ll use this knowledge to render glTF models with PBR materials.

Throughout our engine implementation, we’ll be using vk::raii dynamic rendering and C++20 modules. The vk::raii namespace provides Resource Acquisition Is Initialization (RAII) wrappers for Vulkan objects, which helps with resource management and makes the code cleaner. Dynamic rendering simplifies the rendering process by eliminating the need for explicit render passes and framebuffers. C++20 modules improve code organization, compilation times, and encapsulation compared to traditional header files.

Lighting in computer graphics serves several important purposes:

**Visual Realism**: Proper lighting creates shadows, highlights, and gradients that make 3D objects appear more realistic.

**Spatial Understanding**: Lighting helps viewers understand the spatial relationships between objects in a scene.

**Mood and Atmosphere**: Different lighting setups can dramatically change the mood and atmosphere of a scene.

**Focus and Attention**: Lighting can be used to draw attention to important elements in a scene.

Physically Based Rendering (PBR) represents one of the most significant advancements in real-time graphics over the past decade. Unlike traditional rendering approaches that used ad-hoc shading models, PBR aims to simulate how light interacts with surfaces in the real world based on the principles of physics.

To appreciate PBR, it helps to understand how real-time rendering has evolved:

**Fixed-Function Pipeline (1990s)**: Early 3D hardware used fixed lighting models like Gouraud or Phong shading with limited material properties.

**Programmable Shaders (2000s)**: With the introduction of shader programming, developers could implement custom lighting models, but these were often inconsistent across different lighting conditions.

**Physically Based Rendering (2010s)**: By basing rendering on physical principles, PBR provides more realistic results that remain consistent across different environments.

The key advantages of PBR include:

* 
**Realism**: Materials look correct under any lighting condition

* 
**Consistency**: Artists can create materials that work in all environments

* 
**Intuitiveness**: Material parameters have physical meaning, making them easier to understand

* 
**Efficiency**: Modern PBR implementations are optimized for real-time performance

PBR is built on several key principles that distinguish it from earlier rendering approaches:

In the real world, a surface cannot reflect more light than it receives. This principle of energy conservation is fundamental to PBR:

* 
The sum of diffuse and specular reflection must not exceed 1.0

* 
As surfaces become more metallic, they have less diffuse reflection

* 
As surfaces become rougher, specular highlights become larger but less intense

PBR uses microfacet theory to model surface roughness. This theory assumes that surfaces are composed of tiny, perfectly reflective microfacets with varying orientations:

* 
Smooth surfaces have microfacets that are mostly aligned, creating sharp reflections

* 
Rough surfaces have randomly oriented microfacets, scattering light and creating blurry reflections

* 
The distribution of these microfacets is controlled by the roughness parameter

The Fresnel effect describes how reflectivity changes with viewing angle:

* 
All surfaces become more reflective at grazing angles (angles where the viewing direction is nearly parallel to the surface)

* 
This effect is more noticeable on smooth surfaces

* 
The base reflectivity at normal incidence (F0, when light hits the surface perpendicularly), is determined by the material’s index of refraction

* 
For metals, F0 is colored (based on the metal’s properties)

* 
For non-metals (dielectrics), F0 is typically around 0.04 (4%)

The PBR implementation in glTF and many modern engines uses the metallic-roughness workflow, which defines materials using these primary parameters:

* 
**Base Color**: The albedo or diffuse color of the surface

* 
**Metallic**: How "metal-like" the surface is (0.0 = non-metal, 1.0 = metal)

* 
**Roughness**: How smooth or rough the surface is (0.0 = mirror-like, 1.0 = rough)

This workflow is intuitive for artists and efficient for real-time rendering.

The Bidirectional Reflectance Distribution Function (BRDF) is at the heart of PBR. It describes how light is reflected from a surface, taking into account:

* 
The incoming light direction

* 
The outgoing view direction

* 
The surface normal

* 
The material properties

In PBR, the BRDF is typically split into two components:

* 
**Diffuse BRDF**: Handles light that penetrates the surface, scatters, and exits

* 
**Specular BRDF**: Handles light that reflects directly from the surface

The simplest diffuse BRDF is the Lambertian model:

f_diffuse = albedo / π

Where:

* 
albedo is the base color of the surface

* 
π is a normalization factor

More advanced models like Disney’s diffuse or Oren-Nayar can be used for increased realism, especially for rough surfaces.

For the specular component, PBR typically uses a microfacet BRDF:

f_specular = D * F * G / (4 * (n·ωo) * (n·ωi))

Where:

* 
D is the Normal Distribution Function (NDF)

* 
F is the Fresnel term

* 
G is the Geometry term

* 
n is the surface normal

* 
ωo is the outgoing (view) direction

* 
ωi is the incoming (light) direction

Popular implementations include:

* 
**D**: GGX (Trowbridge-Reitz) distribution

* 
**F**: Schlick’s approximation

* 
**G**: Smith shadowing-masking function

Materials define how surfaces interact with light. Different materials reflect, absorb, and transmit light in different ways. Understanding materials is crucial for creating realistic renderings.

In computer graphics, materials are defined by various properties:

* 
**Base Color/Albedo**: The color of the surface under diffuse lighting

* 
**Metalness**: How metallic the surface is (affects specular reflection and diffuse absorption)

* 
**Roughness/Smoothness**: How rough or smooth the surface is (affects specular highlight size and sharpness)

* 
**Normal Map**: Adds surface detail without increasing geometric complexity

* 
**Ambient Occlusion**: Approximates how much ambient light a surface point receives

* 
**Emissive**: Makes parts of the surface emit light

* 
**Opacity/Transparency**: Controls how transparent the material is

* 
**Refraction**: Controls how light bends when passing through the material

Different types of materials have different characteristics:

* 
**Metals**: High specular reflection, colored specular, no diffuse reflection

* 
**Dielectrics (Non-metals)**: Lower specular reflection, white specular, strong diffuse reflection

* 
**Translucent Materials**: Allow light to pass through and scatter within (e.g., skin, wax, marble)

* 
**Transparent Materials**: Allow light to pass through with minimal scattering (e.g., glass, water)

* 
**Anisotropic Materials**: Reflect light differently based on direction (e.g., brushed metal, hair)

In our implementation, we’ll use push constants to efficiently pass material properties to our shaders.

Push constants are a way to send a small amount of data to shaders without having to create and manage descriptor sets. They’re perfect for frequently changing data like material properties.

By the end of this chapter, you’ll understand:

How Physically Based Rendering works

How to implement PBR in Slang shaders

How to use push constants for material properties

How to integrate PBR lighting with Vulkan

Let’s get started by exploring the principles of Physically Based Rendering in more detail.

[Previous: Camera Transformations - Conclusion](../Camera_Transformations/06_conclusion.html) | [Next: Lighting Models](02_lighting_models.html)
