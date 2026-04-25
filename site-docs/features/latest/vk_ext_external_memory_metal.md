# VK_EXT_external_memory_metal

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_external_memory_metal.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [3. Examples](#_examples)
- [3.1. Importing a Metal texture from a id<MTLTexture>](#_importing_a_metal_texture_from_a_idmtltexture)
- [3.1._Importing_a_Metal_texture_from_a_id<MTLTexture>](#_importing_a_metal_texture_from_a_idmtltexture)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)
[3. Examples](#_examples)

[3.1. Importing a Metal texture from a id](#_importing_a_metal_texture_from_a_idmtltexture)

[4. Issues](#_issues)

This extension allows memory sharing through imports from or export to Metal resource handles.

An application may wish to reference device memory in multiple Vulkan device instances, in multiple processes, and/or in Metal API.
This extension enables an application to export non-Vulkan handles from Vulkan memory objects such that the underlying resources can
be referenced outside the scope of the Vulkan device instance that created them.

While [VK_EXT_metal_objects](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_metal_objects.html) provides a way to expose underlying Metal resources,
when importing an image from an `id` handle, said images and their backing memory will be imported at
[VkImage](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImage) creation.
According to point [12.8 Memory Resource Association](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#resources-association)
resources are created as *virtual allocations* with no backing memory. This leads to having to treat imported images through
[VK_EXT_metal_objects](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_metal_objects.html) differently.

This extension aims to import both resources through [VkDeviceMemory](https://docs.vulkan.org/spec/latest/chapters/memory.html#VkDeviceMemory)
so that later can be bound to a existing
[VkImage](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImage) or
[VkBuffer](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkBuffer) respectively.

This extension aims to standardize memory imports and exports of Vulkan resources using
[VK_KHR_external_memory](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_external_memory.html) as baseline to conform to what other platforms have done with
extensions like [VK_KHR_external_memory_win32](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_external_memory_win32.html) and
[VK_ANDROID_external_memory_android_hardware_buffer](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_ANDROID_external_memory_android_hardware_buffer.html) to name a few.

This means that external Metal resources will be imported through [VkDeviceMemory](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VkDeviceMemory.html) to later be bound.

3 new bit values will be added to [VkExternalMemoryHandleTypeFlagBits](https://docs.vulkan.org/spec/latest/chapters/capabilities.html#VkExternalMemoryHandleTypeFlagBits):

* 
`VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT` to accommodate for Metal buffers (MTLBuffer)

* 
`VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT` to accommodate for Metal textures (MTLTexture)

* 
`VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT` to accommodate for Metal heaps (MTLHeap)

Due to MTLTexture’s semantics in Metal API roughly align with that of an image with a dedicated allocation in Vulkan,
implementations will be required to report `VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT` for
`VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT`. When importing a MTLTexture through the creation of a
[VkDeviceMemory](https://docs.vulkan.org/spec/latest/chapters/memory.html#VkDeviceMemory), the
[VkImage](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImage)
[VkImage](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImage) it will be bound to must have the same
creation parameters as the MTLTexture used at import.

void *metalTexture = /* Initialized to id */;
VkMemoryMetalHandlePropertiesEXT handleProperties;
VkResult result = vkGetMemoryMetalHandlePropertiesEXT(
    device,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT,
    metalTexture,
    &handleProperties);

VkImageCreateInfo imageCreateInfo = {
    // This image creation parameters should match MTLTexture's, or the exported VkImage's
};
VkImage image;
result = vkCreateImage(
    device,
    &imageCreateInfo,
    NULL,               // pAllocator
    &image);

// Import image memory
VkImportMemoryMetalHandleInfoEXT importInfo = {
    .sType = VK_STRUCTURE_TYPE_IMPORT_MEMORY_METAL_HANDLE_INFO_EXT,
    .pNext = NULL,
    .handleType = VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT,
    .handle = metalTexture
};
VkMemoryDedicatedAllocateInfoKHR dedicatedInfo = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_KHR,
    .pNext = &importInfo,
    .image = image,
    .buffer = VK_NULL_HANDLE,
};
VkMemoryAllocateInfo allocateInfo = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO,
    .pNext = &dedicatedInfo,
    .allocationSize = 0, // Ignored. The allocation will have the size of the Metal object
    .memoryTypeIndex = /* Select preferred memory type from handleProperties.memoryTypeBits */
};
// If the Metal object cannot be used for the VkImage we created, implementations will return VK_ERROR_INVALID_EXTERNAL_HANDLE
VkDeviceMemory memory;
result = vkAllocateMemory(
    device,
    &allocateInfo,
    NULL,
    &memory);

if (result == VK_SUCCESS) {
    // Bind memory to image
} else {
    // Handle failure
}

None identified.
