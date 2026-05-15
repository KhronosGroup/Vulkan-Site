# Loading Models: Asset Pipeline Concepts

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Loading_Models/02_project_setup.html

## Table of Contents

- [1. Understanding Asset Pipelines](#_understanding_asset_pipelines)
- [1._Understanding_Asset_Pipelines](#_understanding_asset_pipelines)
- [1.1. Asset Organization Concepts](#_asset_organization_concepts)
- [1.1._Asset_Organization_Concepts](#_asset_organization_concepts)
- [1.2. Asset Pipeline Concepts](#_asset_pipeline_concepts)
- [1.2._Asset_Pipeline_Concepts](#_asset_pipeline_concepts)
- [1.2.1. File Format Selection](#_file_format_selection)
- [1.2.1._File_Format_Selection](#_file_format_selection)
- [1.2.2. Texture Compression](#_texture_compression)
- [1.2.2._Texture_Compression](#_texture_compression)
- [1.2.3. Asset Bundling](#_asset_bundling)
- [1.2.3._Asset_Bundling](#_asset_bundling)
- [1.3. Artist-Engine Collaboration Concepts](#_artist_engine_collaboration_concepts)
- [1.3._Artist-Engine_Collaboration_Concepts](#_artist_engine_collaboration_concepts)
- [1.3.1. Technical Specifications](#_technical_specifications)
- [1.3.1._Technical_Specifications](#_technical_specifications)
- [1.3.2. Workflow Documentation](#_workflow_documentation)
- [1.3.2._Workflow_Documentation](#_workflow_documentation)
- [1.3.3. Technical Art Bridge](#_technical_art_bridge)
- [1.3.3._Technical_Art_Bridge](#_technical_art_bridge)
- [1.4. Development to Production Concepts](#_development_to_production_concepts)
- [1.4._Development_to_Production_Concepts](#_development_to_production_concepts)
- [1.4.1. Development vs. Production Assets](#_development_vs_production_assets)
- [1.4.1._Development_vs._Production_Assets](#_development_vs_production_assets)
- [1.4.2. Asset Validation](#_asset_validation)
- [1.4.2._Asset_Validation](#_asset_validation)
- [1.4.3. Automation Considerations](#_automation_considerations)
- [1.4.3._Automation_Considerations](#_automation_considerations)
- [1.5. Implementation Considerations](#_implementation_considerations)
- [1.5._Implementation_Considerations](#_implementation_considerations)
- [1.5.1. Abstraction Layers](#_abstraction_layers)
- [1.5.1._Abstraction_Layers](#_abstraction_layers)
- [1.5.2. Performance Considerations](#_performance_considerations)
- [1.5.2._Performance_Considerations](#_performance_considerations)
- [1.5.3. Extensibility](#_extensibility)
- [2. Our Project Implementation](#_our_project_implementation)
- [2._Our_Project_Implementation](#_our_project_implementation)
- [2.1. File Formats and Directory Structure](#_file_formats_and_directory_structure)
- [2.1._File_Formats_and_Directory_Structure](#_file_formats_and_directory_structure)
- [2.2. Tools and Libraries](#_tools_and_libraries)
- [2.2._Tools_and_Libraries](#_tools_and_libraries)
- [2.3. Integration with Engine Architecture](#_integration_with_engine_architecture)
- [2.3._Integration_with_Engine_Architecture](#_integration_with_engine_architecture)
- [2.4. Artist Workflow](#_artist_workflow)
- [2.4._Artist_Workflow](#_artist_workflow)
- [2.5. Runtime Loading](#_runtime_loading)
- [2.5._Runtime_Loading](#_runtime_loading)

## Content

Table of Contents

[1. Understanding Asset Pipelines](#_understanding_asset_pipelines)

[1.1. Asset Organization Concepts](#_asset_organization_concepts)
[1.2. Asset Pipeline Concepts](#_asset_pipeline_concepts)
[1.3. Artist-Engine Collaboration Concepts](#_artist_engine_collaboration_concepts)
[1.4. Development to Production Concepts](#_development_to_production_concepts)
[1.5. Implementation Considerations](#_implementation_considerations)

[2. Our Project Implementation](#_our_project_implementation)

[2.1. File Formats and Directory Structure](#_file_formats_and_directory_structure)
[2.2. Tools and Libraries](#_tools_and_libraries)
[2.3. Integration with Engine Architecture](#_integration_with_engine_architecture)
[2.4. Artist Workflow](#_artist_workflow)
[2.5. Runtime Loading](#_runtime_loading)

After exploring engine architecture and camera systems, it’s important to understand how 3D assets are managed in rendering engines. A well-designed asset pipeline is crucial for efficiently handling models, textures, and other resources in any production environment.

When designing an asset organization system, consider these key principles:

**Categorization** - Group similar assets together

**Hierarchy** - Use a nested structure to manage complexity

**Discoverability** - Make assets easy to find and reference

**Scalability** - Design for growth as your project expands

Here’s an example of how assets might be organized in a final product, demonstrating all four principles:

assets/
  ├── models/                  // 3D model files (Categorization)
  │   ├── characters/          // Character models (Hierarchy)
  │   │   ├── player/          // Player character models (Hierarchy)
  │   │   └── npc/             // Non-player character models (Hierarchy)
  │   ├── environments/        // Environment models
  │   │   ├── indoor/          // Indoor environment models
  │   │   └── outdoor/         // Outdoor environment models
  │   └── props/               // Prop models
  ├── textures/                // Texture files (Categorization)
  │   ├── common/              // Shared textures (Discoverability)
  │   └── high_resolution/     // High-res textures for close-up views (Scalability)
  ├── shaders/                 // Shader files
  │   ├── core/                // Essential shaders (Discoverability)
  │   ├── effects/             // Special effect shaders
  │   └── mobile/              // Mobile-optimized shaders (Scalability)
  └── config/                  // Configuration files
      └── quality_presets/     // Different quality settings (Scalability)

This example demonstrates all four principles:

* 
**Categorization**: Assets are grouped by type (models, textures, shaders, config)

* 
**Hierarchy**: Assets are organized in a nested structure (e.g., models > characters > player)

* 
**Discoverability**: Common assets are placed in dedicated folders (e.g., common textures, core shaders) making them easy to find

* 
**Scalability**: The structure accommodates different quality levels and platform-specific assets (e.g., high-resolution textures, mobile shaders, quality presets)

The specific organization should be tailored to your project’s needs, but the underlying principles remain consistent across different engines.

A professional asset pipeline typically involves several stages, regardless of the specific engine implementation:

**Creation** - Artists create models in 3D modeling software

**Export** - Models are exported to interchange formats suitable for game engines

**Validation** - Models are checked for issues (e.g., incorrect scale, missing textures)

**Optimization** - Models are optimized for runtime performance

**Conversion** - Development assets are converted to production-ready formats

**Integration** - Assets are imported into the engine

**Runtime Loading** - The engine loads assets efficiently during execution

When designing an asset pipeline, consider these important factors:

Different file formats offer different trade-offs:

**Interchange Formats** (e.g., glTF, FBX, Collada)

* 
Pros: Widely supported by modeling tools, preserve most data

* 
Cons: May contain unnecessary data, not optimized for runtime

**Runtime Formats** (e.g., glb, engine-specific binary formats)

* 
Pros: Optimized for loading speed and memory usage

* 
Cons: May not be editable outside the engine

Texture compression is crucial for performance:

**Development Formats** (e.g., PNG, JPEG)

* 
Pros: Lossless or high quality, widely supported by editing tools

* 
Cons: Large file sizes, not optimized for GPU

**Runtime Formats** (e.g., ktx, compressed GPU formats)

* 
Pros: Smaller file sizes, directly usable by GPU

* 
Cons: May have quality loss, platform-specific considerations

Consider how assets are packaged:

**Separate Files**

* 
Pros: Easier to update individual assets, simpler version control

* 
Cons: More file operations, potential for missing dependencies

**Bundled Assets**

* 
Pros: Fewer file operations, guaranteed dependencies

* 
Cons: Larger atomic updates, more complex version control

Successful integration of art assets into a rendering engine requires clear communication and established workflows between artists and programmers. Here are key concepts to consider:

Regardless of the specific engine, you’ll need to define:

**Coordinate System** - Different applications use different coordinate systems (e.g., Y-up vs. Z-up)

**Scale** - Establish a consistent scale (e.g., 1 unit = 1 meter or 1 unit = 1 foot)

**Origin Placement** - Define where the origin point should be for different asset types

**Level of Detail** - Specify polygon count ranges for different asset types and usage scenarios

Create documentation that addresses:

**Naming Conventions** - Consistent naming helps with organization and automation

**Material Standards** - Define how materials should be structured (e.g., PBR parameters)

**Export Settings** - Document the correct export settings for your chosen interchange formats

**Quality Checklists** - Provide criteria for validating assets before submission

Consider establishing a technical art role that:

Creates tools to streamline the art-to-engine pipeline

Validates assets before they enter the engine

Provides feedback to artists on technical requirements

Helps troubleshoot issues when assets don’t appear correctly in-engine

The transition from artist-friendly development assets to optimized production assets involves several important concepts:

Understanding the different needs at each stage:

**Development Assets**

* 
Prioritize editability and iteration speed

* 
Use formats that are widely supported by content creation tools

* 
May be larger and less optimized for runtime performance

* 
Focus on preserving maximum quality and information

**Production Assets**

* 
Prioritize runtime performance and memory efficiency

* 
Use formats optimized for the target platform(s)

* 
Apply appropriate compression and optimization techniques

* 
Balance quality against performance requirements

Implement validation at key points in the pipeline:

**Pre-Submission Validation**

* 
Check for adherence to technical specifications

* 
Verify that all required textures and materials are present

* 
Ensure proper scale, orientation, and origin placement

**Pre-Conversion Validation**

* 
Verify that assets can be successfully processed by conversion tools

* 
Check for issues that might cause problems during conversion

**Post-Conversion Validation**

* 
Verify that converted assets maintain visual fidelity

* 
Check for performance issues or memory consumption problems

* 
Ensure compatibility with target platforms

As projects grow, automation becomes increasingly important:

**Batch Processing**

* 
Develop scripts or tools to process multiple assets at once

* 
Implement automated validation checks

**Continuous Integration**

* 
Consider integrating asset processing into your CI/CD pipeline

* 
Automatically validate and convert assets when they’re committed

**Versioning**

* 
Track changes to assets and their processed versions

* 
Implement dependency tracking to rebuild only what’s necessary

When implementing a model loading system in any rendering engine, several key considerations should guide your approach:

Design your model loading system with appropriate abstraction layers:

**File Format Layer**

* 
Handles parsing specific file formats (e.g., glTF, FBX)

* 
Isolates format-specific code to make supporting multiple formats easier

* 
Converts from file format structures to your engine’s internal structures

**Resource Management Layer**

* 
Manages memory and GPU resources

* 
Handles caching and reference counting

* 
Provides a consistent interface regardless of the underlying file format

**Scene Graph Layer**

* 
Organizes models in a hierarchical structure

* 
Manages transformations and parent-child relationships

* 
Facilitates operations like culling and scene traversal

Balance flexibility with performance:

**Asynchronous Loading**

* 
Consider loading models in background threads to avoid blocking the main thread

* 
Implement a system for handling partially loaded models

**Memory Management**

* 
Develop strategies for handling large models

* 
Consider level-of-detail (LOD) systems for complex scenes

* 
Implement streaming for very large environments

**Batching and Instancing**

* 
Group similar models for efficient rendering

* 
Use instancing for repeated elements

Design for future expansion:

**Material System**

* 
Create a flexible material system that can represent various shading models

* 
Support both simple and complex materials

**Animation System**

* 
Design for different animation types (skeletal, morph targets, etc.)

* 
Consider how animations will interact with physics and gameplay systems

**Custom Data**

* 
Allow for engine-specific metadata to be associated with models

* 
Support custom properties for gameplay or rendering purposes

Understanding these concepts provides a solid foundation for designing and implementing model loading systems in any rendering engine. By carefully considering abstraction, performance, and extensibility from the beginning, you can create a robust system that will scale with your project’s needs and adapt to changing requirements.

Now that we’ve explored the general concepts of asset pipelines, let’s discuss how our specific project will implement these concepts.

For our engine, we’ll use the following file formats and directory structure:

**Model Format**: We’ll use glTF 2.0 binary format (.glb) with embedded KTX2 textures. This format offers several advantages:

* 
Compact binary representation for efficient storage and loading

* 
Ability to embed textures, reducing file operations

* 
Support for animations, skinning, and PBR materials

* 
Industry standard with wide tool support

**Texture Format**: We’ll use KTX2 with Basis Universal compression for textures, which provides:

* 
Significant size reduction compared to PNG/JPEG

* 
GPU-ready formats that can be directly uploaded

* 
Cross-platform compatibility through transcoding

* 
Support for mipmaps and various compression formats

**Directory Structure**:

assets/
  ├── models/                  // 3D model files
  │   ├── characters/          // Character models
  │   │   └── viking.glb       // Example character model
  │   ├── environments/        // Environment models
  │   │   └── room.glb         // Example environment model
  │   └── props/               // Prop models
  │       └── furniture.glb    // Example prop model
  └── shaders/                 // Shader files
      └── pbr.slang            // PBR shader

We’ll use the following tools and libraries to implement our asset pipeline:

**Model Loading**: We’ll use the tinygltf library to parse glTF files. This library provides:

* 
Comprehensive support for the glTF 2.0 specification

* 
Efficient parsing of binary glTF files

* 
Access to all glTF components (meshes, materials, animations, etc.)

**Texture Loading**: We’ll use the KTX-Software library to load KTX2 textures, which offers:

* 
Support for loading and transcoding Basis Universal compressed textures

* 
Efficient mipmap handling

* 
Integration with Vulkan texture formats

**Asset Conversion**: For converting development assets to production assets, we’ll use:

* 
KTX-Tools for texture conversion (PNG/JPEG to KTX2)

* 
glTF-Transform for model processing and optimization

* 
Custom scripts for automating the conversion process

Our model loading system will integrate with the engine architecture from previous chapters:

**Resource Management**: We’ll leverage the resource management system from the Engine Architecture chapter to:

* 
Cache loaded models and textures

* 
Implement reference counting for efficient memory management

* 
Support asynchronous loading of models

**Component System**: We’ll create the following components:

* 
ModelComponent: Manages model rendering and animation

* 
MaterialComponent: Handles material properties and textures

* 
These components will work with the TransformComponent from the Camera Transformations chapter

**Rendering Pipeline**: Our model loading system will integrate with the rendering pipeline by:

* 
Providing mesh data for the geometry pass

* 
Supporting PBR materials for the lighting pass

* 
Enabling instanced rendering for repeated models

Our workflow for artists will be:

**Development Phase**:

* 
Artists create models in tools like Blender or Maya

* 
Export to standard glTF (.gltf) with separate PNG/JPEG textures

* 
Test with glTF viewers to ensure correct appearance

**Technical Requirements**:

* 
Right-handed coordinate system with Y-up

* 
1 unit = 1 meter scale

* 
PBR materials using the metallic-roughness workflow

* 
Textures with power-of-two dimensions

**Conversion Process**:

* 
Validate models against technical requirements

* 
Convert textures to KTX2 with Basis Universal compression

* 
Embed textures into glb files

* 
Optimize models (remove unused vertices, compress meshes, etc.)

**Integration**:

* 
Place converted assets in the appropriate directories

* 
Register assets in the resource management system

* 
Create entities with appropriate components

At runtime, our engine will:

**Load Models**:

* 
Parse glb files using tinygltf

* 
Extract mesh data, materials, and animations

* 
Create Vulkan buffers for vertices and indices

**Process Materials**:

* 
Load embedded KTX2 textures

* 
Create Vulkan image views and samplers

* 
Set up descriptor sets for PBR rendering

**Handle Animations**:

* 
Parse animation data from glTF

* 
Implement skeletal animation system

* 
Support animation blending and transitions

**Render Models**:

* 
Use the scene graph to organize models hierarchically

* 
Apply transformations from the transform component

* 
Render with appropriate materials and shaders

By implementing these specific approaches, our engine will have a robust and efficient asset pipeline that aligns with the general concepts discussed earlier in this chapter.

[Previous: Introduction](01_introduction.html) | [Next: Implementing the Model Loading System](03_model_system.html)
