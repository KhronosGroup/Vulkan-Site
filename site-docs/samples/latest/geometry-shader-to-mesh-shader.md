# Geometry shader to mesh shader

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/gshader_to_mshader/README.html

## Table of Contents

- [Overview](#_overview)
- [Meshlets](#_meshlets)
- [Enabling the Extension](#_enabling_the_extension)
- [Enabling_the_Extension](#_enabling_the_extension)
- [Pros and cons](#_pros_and_cons)
- [Pros_and_cons](#_pros_and_cons)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/gshader_to_mshader). |
| --- | --- |

![Sample](../../../_images/samples/extensions/gshader_to_mshader/images/visualization_of_normals.png)

This sample demonstrates how a mesh shader can be used to achieve the same results as with geometry shader.
It contains geometry and mesh shader pipelines visualizing normals in the teapot model.

To access model vertices from within mesh shader it needs to be stored within an **S**hader **S**torage **B**uffer **O**bject (SSBO).
Indices need to be divided into meshlets and also stored within an SSBO so each work item can work on a single meshlet.
Meshlets are created by spliting source geometry.
Exemplary meshlet structure used in this sample:

struct Meshlet
{
	uint32_t vertices[64];
	uint32_t indices[126];
	uint32_t vertex_count;
	uint32_t index_count;
};

By linearly scanning the indices of the model, Meshlet-structures are created with up to 126 indices or 64 unique vertex indices, whatever is reached first.
See prepare_meshlets() for an exemplary implementation.

This sample expands function `load_model()` by adding a bool storage_buffer parameter, set to false by default.
In that function model data is read from the file teapot.gltf.
By setting storage_buffer to true, vertex position and normals are stored in an SSBO using the `AlignedVertex` structure (because of std430 memory layout).
After that, indices are divided into meshlets using the `Meshlet` structure and also stored in SSBOs.

The device extension is provided by `VK_EXT_MESH_SHADER_EXTENSION_NAME`.
It requires `VK_KHR_SPIRV_1_4_EXTENSION_NAME`, which in turn require VulkanAPI 1.1 and `VK_KHR_SHADER_FLOAT_CONTROLS_EXTENSION_NAME`.
SPIRV needs to be set to 1.4.

set_api_version(VK_API_VERSION_1_1);
add_device_extension(VK_EXT_MESH_SHADER_EXTENSION_NAME);
add_device_extension(VK_KHR_SPIRV_1_4_EXTENSION_NAME);
add_device_extension(VK_KHR_SHADER_FLOAT_CONTROLS_EXTENSION_NAME);
vkb::GLSLCompiler::set_target_environment(glslang::EShTargetSpv, glslang::EShTargetSpv_1_4);

The `VkPhysicalDeviceMeshShaderFeaturesEXT` structure needs to be included in the pNext chain of the `VkPhysicalDeviceFeatures2` structure passed to vkGetPhysicalDeviceFeatures2

auto &requested_vertex_input_features      = gpu.request_extension_features(VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_EXT);
requested_vertex_input_features.meshShader = VK_TRUE;

Usage of geometry shader is usually not advised for real-time rendering purposes as it leads to high memory bandwith and reduced performance.
On the other hand it is part of traditional pipeline and doesn’t require additional pre-procesing of source geometry opposite to mesh shader.

Mesh shader offers better performance and is more flexible in it potential usage but in case of working with a source geometry pre-processing is needed (meshlets).
