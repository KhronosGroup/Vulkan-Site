# Graphics pipeline libraries

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/graphics_pipeline_library/README.html

## Table of Contents

- [Overview](#_overview)
- [Individual pipeline states](#_individual_pipeline_states)
- [Individual_pipeline_states](#_individual_pipeline_states)
- [Creating pipeline libraries](#_creating_pipeline_libraries)
- [Creating_pipeline_libraries](#_creating_pipeline_libraries)
- [Deprecating shader modules](#_deprecating_shader_modules)
- [Deprecating_shader_modules](#_deprecating_shader_modules)
- [Linking executables](#_linking_executables)
- [The sample](#_the_sample)
- [Independent Descriptor Sets](#_independent_descriptor_sets)
- [Independent_Descriptor_Sets](#_independent_descriptor_sets)
- [Additional resources](#_additional_resources)
- [Conclusion](#_conclusion)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/graphics_pipeline_library). |
| --- | --- |

The [`VK_EXT_graphics_pipeline_library`](https://www.khronos.org/registry/vulkan/specs/latest/man/html/VK_EXT_graphics_pipeline_library.html) extensions allows separate compilation of different parts of the graphics pipeline.
With this it’s now possible to split up the monolithic pipeline creation into different steps and re-use common parts shared across different pipelines.

Compared to monolithic pipeline state, this results in faster pipeline creation times, making this extension a good fit for applications and games that do a lot of pipeline creation at runtime.

As noted above, the monolithic pipeline state has been split into distinct parts that can be compiled independently:

* 
[Vertex Input Interface](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#pipeline-graphics-subsets-vertex-input)

* 
[Pre-Rasterization Shaders](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#pipeline-graphics-subsets-pre-rasterization)

* 
[Fragment Shader](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#pipeline-graphics-subsets-fragment-shader)

* 
[Fragment Output Interface](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#pipeline-graphics-subsets-fragment-output)

Creating a pipeline library (part) is similar to creating a pipeline, with the difference that you only need to specify the properties required for that specific pipeline state (see above).
E.g.
for the vertex input interface you only specify input assembly and vertex input state, which is all required to define the interfaces to a vertex shader.

VkGraphicsPipelineLibraryCreateInfoEXT library_info{};
library_info.sType = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_LIBRARY_CREATE_INFO_EXT;
library_info.flags = VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT;

VkPipelineInputAssemblyStateCreateInfo       input_assembly_state  = vkb::initializers::pipeline_input_assembly_state_create_info(VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST, 0, VK_FALSE);
VkPipelineVertexInputStateCreateInfo         vertex_input_state    = vkb::initializers::pipeline_vertex_input_state_create_info();
std::vector vertex_input_bindings = {
    vkb::initializers::vertex_input_binding_description(0, sizeof(Vertex), VK_VERTEX_INPUT_RATE_VERTEX),
};
std::vector vertex_input_attributes = {
    vkb::initializers::vertex_input_attribute_description(0, 0, VK_FORMAT_R32G32B32_SFLOAT, 0),
    vkb::initializers::vertex_input_attribute_description(0, 1, VK_FORMAT_R32G32B32_SFLOAT, sizeof(float) * 3),
    vkb::initializers::vertex_input_attribute_description(0, 2, VK_FORMAT_R32G32_SFLOAT, sizeof(float) * 6),
};
vertex_input_state.vertexBindingDescriptionCount   = static_cast(vertex_input_bindings.size());
vertex_input_state.pVertexBindingDescriptions      = vertex_input_bindings.data();
vertex_input_state.vertexAttributeDescriptionCount = static_cast(vertex_input_attributes.size());
vertex_input_state.pVertexAttributeDescriptions    = vertex_input_attributes.data();

VkGraphicsPipelineCreateInfo pipeline_library_create_info{};
pipeline_library_create_info.sType               = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO;
pipeline_library_create_info.flags               = VK_PIPELINE_CREATE_LIBRARY_BIT_KHR | VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT;
pipeline_library_create_info.sType               = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO;
pipeline_library_create_info.pNext               = &library_info;
pipeline_library_create_info.pInputAssemblyState = &input_assembly_state;
pipeline_library_create_info.pVertexInputState   = &vertex_input_state;

vkCreateGraphicsPipelines(get_device().get_handle(), pipeline_cache, 1, &pipeline_library_create_info, nullptr, &pipeline_library.vertex_input_interface);

With this extension, creating shader modules with `vkCreateShaderModule` has been deprecated and you can instead just pass the shader module create info via `pNext` into your pipeline shader stage create info.
This change bypasses a useless copy and is recommended:

VkShaderModuleCreateInfo shader_module_create_info{};
shader_module_create_info.sType    = VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO;
shader_module_create_info.codeSize = static_cast(spirv.size()) * sizeof(uint32_t);
shader_module_create_info.pCode    = spirv.data();

VkPipelineShaderStageCreateInfo shader_Stage_create_info{};
shader_Stage_create_info.sType = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO;
// Chain the shader module create info
shader_Stage_create_info.pNext = &shader_module_create_info;
shader_Stage_create_info.stage = VK_SHADER_STAGE_VERTEX_BIT;
shader_Stage_create_info.pName = "main";

VkGraphicsPipelineCreateInfo pipeline_library_create_info{};
pipeline_library_create_info.stageCount = 1;
pipeline_library_create_info.pStages    = &shader_Stage_create_info;

You can see this in the pre-rasterization and fragment shader library setup parts of the sample.

Once all pipeline (library) parts have been created, the pipeline executable can be linked together from them:

std::vector libraries = {
    pipeline_library.vertex_input_interface,
    pipeline_library.pre_rasterization_shaders,
    fragment_shader,
    pipeline_library.fragment_output_interface
};

// Link the library parts into a graphics pipeline
VkPipelineLibraryCreateInfoKHR linking_info{};
linking_info.sType        = VK_STRUCTURE_TYPE_PIPELINE_LIBRARY_CREATE_INFO_KHR;
linking_info.libraryCount = static_cast(libraries.size());
linking_info.pLibraries   = libraries.data();

VkGraphicsPipelineCreateInfo executable_pipeline_create_info{};
executable_pipeline_create_info.sType = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO;
executable_pipeline_create_info.pNext = &linking_info;
executable_pipeline_create_info.flags = VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT;

VkPipeline executable = VK_NULL_HANDLE;
vkCreateGraphicsPipelines(get_device().get_handle(), thread_pipeline_cache, 1, &executable_pipeline_create_info, nullptr, &executable);

This will result in the pipeline state object to be used at draw time.

A note on `VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT`: This is an optimization flag.
If specified, implementations are allowed to do additional optimization passes.
This may increase build times but can in turn result in lower runtime costs.

![Sample](../../../_images/samples/extensions/graphics_pipeline_library/images/sample.jpg)

This sample demonstrates that functionality by creating the shared vertex input interface, pre-rasterization shader state and fragment output interface parts only once up-front, and then re-uses them to create pipelines with customized fragment shaders using random lighting models at runtime.
Pipelines are created in a background thread and once they’re created, command buffers are updated to display a mesh using the new pipeline.

While this sample doesn’t use it, this extension has a `VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT` flag that can be used.

Imagine a situation where the vertex and fragment stage accesses two different descriptor sets:

// Vertex Shader
layout(set = 0) UBO_X;

// Fragment Shader
layout(set = 1) UBO_Y;

Normally when compiling a pipeline, both stages are together and internally a driver will reserve 2 separate descriptor slots for `UBO_X` and `UBO_Y`.
When using graphics pipeline libraries, the driver will see the fragment shader only uses a single descriptor set.
It might internally map it to `set 0`, but when linking the two libraries, there will be a collision.
The `VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT` flag ensures the driver will be able to handle this case and not have any collisions.
There are some extra constraints when using this flag, but the Validation Layers will detect them for you.

* 
[Reducing Draw Time Hitching with VK_EXT_graphics_pipeline_library](https://www.khronos.org/blog/reducing-draw-time-hitching-with-vk-ext-graphics-pipeline-library)

* 
[Extension proposal](https://docs.vulkan.org/features/latest/features/proposals/VK_EXT_graphics_pipeline_library.html)

With the new extension it’s now possible to separate the monolithic pipeline state into multiple parts that can be reused  and built independently.
This opens up new possibilities for optimizing pipeline creation and reducing hitches at runtime.
