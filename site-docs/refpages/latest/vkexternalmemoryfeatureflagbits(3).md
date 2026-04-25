# VkExternalMemoryFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryFeatureFlagBits - Bitmask specifying features of an external memory handle type

Bits which **may** be set in
[VkExternalMemoryProperties](VkExternalMemoryProperties.html)::`externalMemoryFeatures`, specifying
features of an external memory handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalMemoryFeatureFlagBits {
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT = 0x00000001,
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT = 0x00000002,
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT = 0x00000004,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT,
} VkExternalMemoryFeatureFlagBits;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryFeatureFlagBits
typedef VkExternalMemoryFeatureFlagBits VkExternalMemoryFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#) specifies that
tensors,
    images or buffers created with the specified parameters and handle type
    **must** use the mechanisms defined by [VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)
    and [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)
or [VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)
    to create (or import) a dedicated allocation for the
tensor,
    image or buffer.

* 
[VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT](#) specifies that handles
of this type **can** be exported from Vulkan memory objects.

* 
[VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT](#) specifies that handles
of this type **can** be imported as Vulkan memory objects.

Because their semantics in external APIs roughly align with that of an image
or buffer with a dedicated allocation in Vulkan, implementations are
**required** to report [VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#) for
the following external handle types:

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
for images only

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html) for images
only

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#) for buffers with
external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html).
Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#) for buffers with
external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html).
Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#) for
tensors,
images or buffers with external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html).

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryFeatureFlags](VkExternalMemoryFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalMemoryFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
