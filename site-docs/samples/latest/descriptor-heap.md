# Descriptor heap

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/descriptor_heap/README.html

## Table of Contents

- [Overview](#_overview)
- [Key benefits](#_key_benefits)
- [No descriptor pools or descriptor sets](#_no_descriptor_pools_or_descriptor_sets)
- [No_descriptor_pools_or_descriptor_sets](#_no_descriptor_pools_or_descriptor_sets)
- [No pipeline layout compatibility constraints](#_no_pipeline_layout_compatibility_constraints)
- [No_pipeline_layout_compatibility_constraints](#_no_pipeline_layout_compatibility_constraints)
- [Descriptors as plain memory](#_descriptors_as_plain_memory)
- [Descriptors_as_plain_memory](#_descriptors_as_plain_memory)
- [Natural fit for bindless rendering](#_natural_fit_for_bindless_rendering)
- [Natural_fit_for_bindless_rendering](#_natural_fit_for_bindless_rendering)
- [Simplified command buffer state management](#_simplified_command_buffer_state_management)
- [Simplified_command_buffer_state_management](#_simplified_command_buffer_state_management)
- [Heap types](#_heap_types)
- [Creating heaps](#_creating_heaps)
- [Uploading data to heaps](#_uploading_data_to_heaps)
- [Uploading_data_to_heaps](#_uploading_data_to_heaps)
- [Binding heaps](#_binding_heaps)
- [Push data (instead of push constants)](#_push_data_instead_of_push_constants)
- [Push_data_(instead_of_push_constants)](#_push_data_instead_of_push_constants)
- [Accessing heaps](#_accessing_heaps)
- [Descriptor set and binding mappings](#_descriptor_set_and_binding_mappings)
- [Descriptor_set_and_binding_mappings](#_descriptor_set_and_binding_mappings)
- [Untyped pointers](#_untyped_pointers)
- [Links](#_links)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/descriptor_heap). |
| --- | --- |

Managing descriptors is one of the harder parts of Vulkan. The [VK_EXT_descriptor_buffer](https://docs.vulkan.org/features/latest/features/proposals/VK_EXT_descriptor_buffer.html) extension aimed to simplify this, but it came with a few caveats.

The [VK_EXT_descriptor_heap](https://docs.vulkan.org/features/latest/features/proposals/VK_EXT_descriptor_heap.html) extension addresses these caveats and completely overhauls Vulkan’s descriptor.

This extension is intended to completely replace Vulkan’s existing descriptor set mechanism and, if available, supersedes descriptor buffers. It is meant to be the way forward for passing data to shaders.

In Vulkan, descriptor state is built around several explicit objects and binding steps. Applications define descriptor set layouts, create compatible pipeline layouts, allocate descriptor sets from descriptor pools, update those sets with resource information, and bind them during command buffer generation. This model is very explicit and works well, but it also means that descriptor management tends to become one of the more rigid and verbose parts of using Vulkan.

Descriptor heaps replace most of that object-centric workflow with a memory-centric one. Instead of allocating descriptor sets and binding them per draw or dispatch, the application writes descriptor data directly into heap memory and binds the heaps themselves. Shaders then access descriptors either through set-and-binding mappings, which can be used with existing shaders, or more directly via untyped pointers. In practice, this moves descriptor handling closer to how applications already think about buffers: allocate memory, write data into it, and provide an addressable view to the GPU.

So the shift is not only about reducing API objects. It is also about changing the mental model from "create and bind descriptor objects" to "manage descriptor memory".

To sum it up: descriptor heaps greatly simplify descriptor management and make it much more flexible.

Understanding why descriptor heaps matter in practice comes down to a handful of concrete advantages over the traditional model.

In traditional Vulkan, applications must pre-allocate descriptor pools, specify counts per descriptor type, and allocate descriptor sets from those pools. Getting pool sizes wrong leads to out-of-memory errors, and fragmentation can become a problem over time. With descriptor heaps, there are no pools and no sets - just heap buffers. Allocation is as straightforward as sizing a buffer for the number of descriptors you need.

Traditional descriptor sets are bound against a specific pipeline layout, and the layout of the bound sets must be compatible with the pipeline being used. With descriptor heaps, there are no pipeline layouts for descriptor data. The same heap bindings work across all pipelines.

Updating descriptors in the traditional model requires a `vkUpdateDescriptorSets` call, and the set must not be in use by the GPU at the time. With descriptor heaps, updating a descriptor is just a memory write via the `vkWrite*DescriptorsEXT` functions. This removes the "in-use" constraint at the descriptor object level and reduces the CPU-side API overhead per update.

Descriptor indexing ([VK_EXT_descriptor_indexing](https://docs.vulkan.org/refpages/latest/refpages/source/VK_EXT_descriptor_indexing.html)) made bindless rendering possible in Vulkan by treating descriptor sets as large arrays. Descriptor heaps take that idea further: an offset into heap memory is all that is needed to address any resource. There is no large descriptor set to maintain or bind — just a heap and an index.

With heaps bound once per command buffer, there is no need to rebind descriptor sets when switching pipelines that share the same resource layout. This reduces the number of binding commands recorded per frame, which can meaningfully lower CPU overhead in draw-call-heavy workloads.

Implementations require two distinct heap types, so this extension differentiates between:

* 
Sampler heaps for storing samplers

* 
Resource heaps for storing all other resource types like buffers and images

So in a typical scenario where we want to use e.g. uniform buffers, storage buffers, images and samplers, we need to create two distinct heaps.

As noted above, heaps are basically just memory that you can copy descriptor-related information to. Creating a heap therefore is no different from creating any other buffer in Vulkan and requires the `VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT` usage flag:

const VkDeviceSize heap_buffer_size = aligned_size(image_heap_offset + cube_count * image_descriptor_size + descriptor_heap_properties.minResourceHeapReservedRange, descriptor_heap_properties.resourceHeapAlignment);

descriptor_heap_resources =
    std::make_unique(
        get_device(),
        heap_buffer_size,
        VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT |  VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
        VMA_MEMORY_USAGE_CPU_TO_GPU);

What information is required to store a descriptor type in a heap varies. The destination where this information is stored in the heap is passed using [host address ranges](https://docs.vulkan.org/refpages/latest/refpages/source/VkHostAddressRangeEXT.html).

For samplers, we pass `VkSamplerCreateInfo` (no need to create an actual `VkSampler`):

VkSamplerCreateInfo sampler_ci{
    .sType = VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO,
	.magFilter     = VK_FILTER_LINEAR,
	.minFilter     = VK_FILTER_LINEAR,
    ...};
VkHostAddressRangeEXT sampler_har{
    .address = (uint8_t *) (descriptor_heap_samplers->get_data()) + sampler_heap_offset,
	.size    = sampler_descriptor_size};
vkWriteSamplerDescriptorsEXT(get_device().get_handle(), 1, &sampler_ci, &sampler_har);

For images, we pass `VkImageViewCreateInfo` (pointing to the actual `VkImage`):

VkImageViewCreateInfo image_view_ci{
    .sType            = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
    .image            = texture.image->get_vk_image().get_handle(),
    .viewType         = VK_IMAGE_VIEW_TYPE_2D
    ...};
VkImageDescriptorInfoEXT image_descriptor_info{
    .sType  = VK_STRUCTURE_TYPE_IMAGE_DESCRIPTOR_INFO_EXT,
    .pView  = &image_view_ci,
    ...};
VkResourceDescriptorInfoEXT image_resource_desc{
    .sType = VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT,
    .type  = VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE,
    .data  = {.pImage = &image_descriptor_info}};
VkHostAddressRangeEXT       image_host_address{
    .address = (uint8_t *) (descriptor_heap_resources->get_data()) + image_heap_offset,
    .size    = image_descriptor_size};
vkWriteResourceDescriptorsEXT(get_device().get_handle(), 1, &image_resource_desc, &image_host_address);

For buffers, we just pass their device address and range:

VkDeviceAddressRangeEXT buffer_device_addr_range{
    .address = uniform_buffer->get_device_address(),
    .size = uniform_buffer->get_size()};
VkResourceDescriptorInfoEXT buffer_resource_desc{
    .sType = VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT,
    .type  = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
    .data  = {.pAddressRange = &buffer_device_addr_range}};
VkHostAddressRangeEXT buffer_host_address{
    .address = (uint8_t *) (descriptor_heap_resources->get_data()),
    .size    = buffer_descriptor_size};
vkWriteResourceDescriptorsEXT(get_device().get_handle(), 1, &buffer_resource_desc, &buffer_host_address);

[vkWriteResourceDescriptorsEXT](https://docs.vulkan.org/refpages/latest/refpages/source/vkWriteResourceDescriptorsEXT.html) and [vkWriteSamplerDescriptorsEXT](https://docs.vulkan.org/refpages/latest/refpages/source/vkWriteSamplerDescriptorsEXT.html) are then used to write the descriptors to heap memory.

**Note:** The above examples are simplified to show a basic setup. The `vkWrite*DescriptorsEXT` functions can be used to write multiple descriptors to a heap at once.

Heaps are bound per heap type using [vkCmdBindResourceHeapEXT](https://docs.vulkan.org/refpages/latest/refpages/source/vkCmdBindResourceHeapEXT.html), so if you use a resource heap and a sampler heap, you need to issue two binding calls:

// Bind the resource heap (buffers and images)
VkBindHeapInfoEXT bind_heap_info_res{
    .sType = VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT,
    .heapRange{
        .address = descriptor_heap_resources->get_device_address(),
        .size    = descriptor_heap_resources->get_size()},
    .reservedRangeOffset = descriptor_heap_resources->get_size() - descriptor_heap_properties.minResourceHeapReservedRange,
    .reservedRangeSize = descriptor_heap_properties.minResourceHeapReservedRange,
};
vkCmdBindResourceHeapEXT(draw_cmd_buffer, &bind_heap_info_res);

// Bind the sampler heap
VkBindHeapInfoEXT bind_heap_info_samplers{
    .sType = VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT,
    .heapRange{
        .address = descriptor_heap_samplers->get_device_address(),
        .size    = descriptor_heap_samplers->get_size()},
    .reservedRangeOffset = descriptor_heap_samplers->get_size() - descriptor_heap_properties.minSamplerHeapReservedRange,
    .reservedRangeSize = descriptor_heap_properties.minSamplerHeapReservedRange};
vkCmdBindSamplerHeapEXT(draw_cmd_buffer, &bind_heap_info_samplers);

...

// All draw calls will source from heaps (until non-heap bindings are issued)
vkCmdDrawIndexed(draw_cmd_buffer, cube->vertex_indices, 2, 0, 0, 0);

**Note:** One important difference, compared to other buffers, is the **reserved range** (e.g. `reservedRangeOffset` and `reservedRangeSize`). Implementations, to varying degrees, need additional space for some descriptor-related operations. This space must not be used by the application, so we need to both allocate it and mark those regions as reserved. For this sample, we put the reserved range after the space where we have copied the descriptors.

This extension also adds a more direct way to push state data to the command buffer. With no need for pipeline layouts, this is now much simpler and is done via a single call to [vkCmdPushDataEXT](https://docs.vulkan.org/refpages/latest/refpages/source/vkCmdPushDataEXT.html):

PushData push_data{ ... };
VkPushDataInfoEXT push_data_info{
    .sType = VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT,
    .data  = {.address = &push_data, .size = sizeof(PushData)}};
vkCmdPushDataEXT(draw_cmd_buffer, &push_data_info);

The extension lets us access descriptors in shaders in two different ways:

[VkDescriptorSetAndBindingMappingEXT](https://docs.vulkan.org/refpages/latest/refpages/source/VkDescriptorSetAndBindingMappingEXT.html) can be used to simplify porting existing codebases to descriptor heaps. By using this, existing shaders can be used without having to modify them. The syntax for binding descriptors, regardless of shading language, stays the same.

This sample uses [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](https://docs.vulkan.org/spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT) for mapping the bindings, but there are other options available. A good overview on the different mapping options and when to use them can be found in the [guide](https://docs.vulkan.org/guide/latest/descriptor_heap.html#_mapping_the_heap_to_exisiting_shaders).

// Vertex shader
layout (set = 0, binding = 0) uniform UBO {
	mat4 projection;
	mat4 view;
	mat4 model;
} ubo[2];

// Fragment shader
layout (set = 1, binding = 0) uniform texture2D textureImage[2];
layout (set = 2, binding = 0) uniform sampler textureSampler[2];

The app then defines how the heaps are mapped to those bindings:

std::array set_binding_mappings{};

// Maps "layout (set = 0, binding = 0) uniform UBO"
set_binding_mappings[0] = {
    .sType         = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT,
    .descriptorSet = 0,
    .firstBinding  = 0,
    .bindingCount  = 1,
    .resourceMask  = VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT,
    .source        = VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT,
    .sourceData    = {
           .constantOffset = {
               .heapArrayStride = static_cast(buffer_descriptor_size)}}};

// Maps "layout (set = 1, binding = 0) uniform texture2D"
set_binding_mappings[1] = {
    .sType         = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT,
    .descriptorSet = 1,
    .firstBinding  = 0,
    .bindingCount  = 1,
    .resourceMask  = VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT,
    .source        = VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT,
    .sourceData    = {
           .constantOffset = {
               .heapOffset = static_cast(image_heap_offset), .heapArrayStride = static_cast(image_descriptor_size)}}};

// Maps "layout (set = 2, binding = 0) uniform sampler"
set_binding_mappings[2] = {
    .sType         = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT,
    .descriptorSet = 2,
    .firstBinding  = 0,
    .bindingCount  = 1,
    .resourceMask  = VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT,
    .source        = VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT,
    .sourceData    = {
           .constantOffset = {
               .heapOffset = static_cast(sampler_heap_offset), .heapArrayStride = static_cast(sampler_descriptor_size)}}};

These mappings need to be passed to the corresponding shader stages:

VkShaderDescriptorSetAndBindingMappingInfoEXT descriptor_set_binding_mapping_info{
    .sType        = VK_STRUCTURE_TYPE_SHADER_DESCRIPTOR_SET_AND_BINDING_MAPPING_INFO_EXT,
    .mappingCount = static_cast(set_binding_mappings.size()),
    .pMappings    = set_binding_mappings.data()};

shader_stages[0].pNext = &descriptor_set_binding_mapping_info;
shader_stages[1].pNext = &descriptor_set_binding_mapping_info;

**Note:** This is not yet demonstrated in this sample. Support also varies between shading languages and might not be available everywhere.

As a more forward-looking approach, descriptors can be accessed directly from a shader using SPIR-V untyped pointers, which are exposed in Vulkan via [VK_KHR_shader_untyped_pointers](https://docs.vulkan.org/refpages/latest/refpages/source/VK_KHR_shader_untyped_pointers.html).

This requires shaders to be adapted accordingly and also requires the shading language to support this feature. In GLSL, for example, this is provided via [GLSL_EXT_descriptor_heap](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_descriptor_heap.txt):

#extension GL_EXT_descriptor_heap: require
...
layout(descriptor_heap) uniform texture2D textureImage[];
layout(descriptor_heap) uniform sampler textureSampler[];
...
vec4 color = texture(sampler2D(textureImage[someIndex]));

* 
[Extension proposal](https://docs.vulkan.org/features/latest/features/proposals/VK_EXT_descriptor_heap.html)

* 
[Vulkan Guide entry](https://docs.vulkan.org/guide/latest/descriptor_heap.html)

* 
[Blog entry](https://www.khronos.org/blog/vulkan-introduces-roadmap-2026-and-new-descriptor-heap-extension)

* 
[Extension device coverage](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_EXT_descriptor_heap)
