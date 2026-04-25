# Camera & Transformations: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Camera_Transformations/01_introduction.html

## Table of Contents

- [Prerequisites](#_prerequisites)

## Content

Welcome to the "Camera & Transformations" chapter of our "Building a Simple Engine" series! In this chapter, we’ll dive into the essential mathematics and techniques needed to implement a 3D camera system in Vulkan.

Understanding how to manipulate 3D space is fundamental to creating interactive 3D applications. We’ll explore the mathematical foundations of 3D transformations and implement a flexible camera system that will allow us to navigate and view our 3D scenes from any perspective.

In this chapter, we’ll focus on:

* 
Understanding the mathematical foundations of 3D transformations

* 
Implementing different types of transformation matrices (model, view, projection)

* 
Creating a flexible camera system with different movement modes

* 
Handling user input to control the camera

* 
Integrating the camera system with our Vulkan rendering pipeline

By the end of this chapter, you’ll have a solid understanding of 3D transformations and a reusable camera system that can be integrated into your Vulkan applications.

Before starting this chapter, you should have completed the main Vulkan tutorial. You should also be familiar with:

* 
Basic Vulkan concepts:

[Command buffers](../../03_Drawing_a_triangle/03_Drawing/01_Command_buffers.html)

* 
[Graphics pipelines](../../03_Drawing_a_triangle/02_Graphics_pipeline_basics/00_Introduction.html)

[Vertex](../../04_Vertex_buffers/00_Vertex_input_description.html) and [index buffers](../../04_Vertex_buffers/03_Index_buffer.html)

[Uniform buffers](../../05_Uniform_buffers/00_Descriptor_set_layout_and_buffer.html)

Basic programming concepts and C++

[Previous: Engine Architecture Conclusion](../Engine_Architecture/conclusion.html) | [Next: Mathematical Foundations](02_math_foundations.html)
