# VK_KHR_external_memory_capabilities(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_memory_capabilities.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_memory_capabilities](#VK_KHR_external_memory_capabilities)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_external_memory_capabilities - instance extension

**Name String**

`VK_KHR_external_memory_capabilities`

**Extension Type**

Instance extension

**Registered Extension Number**

72

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_memory_capabilities] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_memory_capabilities extension*)

**Last Modified Date**

2016-10-17

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)`.

* 
Interacts with `[VK_NV_dedicated_allocation](VK_NV_dedicated_allocation.html)`.

**Contributors**

* 
Ian Elliott, Google

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

An application may wish to reference device memory in multiple Vulkan
logical devices or instances, in multiple processes, and/or in multiple
APIs.
This extension provides a set of capability queries and handle definitions
that allow an application to determine what types of “external” memory
handles an implementation supports for a given set of use cases.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetPhysicalDeviceExternalBufferPropertiesKHR](vkGetPhysicalDeviceExternalBufferProperties.html)

* 
[VkExternalBufferPropertiesKHR](VkExternalBufferProperties.html)

* 
[VkExternalMemoryPropertiesKHR](VkExternalMemoryProperties.html)

* 
[VkPhysicalDeviceExternalBufferInfoKHR](VkPhysicalDeviceExternalBufferInfo.html)

* 
Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

[VkExternalImageFormatPropertiesKHR](VkExternalImageFormatProperties.html)

Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

* 
[VkPhysicalDeviceExternalImageFormatInfoKHR](VkPhysicalDeviceExternalImageFormatInfo.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceIDPropertiesKHR](VkPhysicalDeviceIDProperties.html)

* 
[VkExternalMemoryFeatureFlagBitsKHR](VkExternalMemoryFeatureFlagBits.html)

* 
[VkExternalMemoryHandleTypeFlagBitsKHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VkExternalMemoryFeatureFlagsKHR](VkExternalMemoryFeatureFlags.html)

* 
[VkExternalMemoryHandleTypeFlagsKHR](VkExternalMemoryHandleTypeFlags.html)

* 
`VK_KHR_EXTERNAL_MEMORY_CAPABILITIES_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_MEMORY_CAPABILITIES_SPEC_VERSION`

* 
[VK_LUID_SIZE_KHR](VK_LUID_SIZE.html)

* 
Extending [VkExternalMemoryFeatureFlagBits](VkExternalMemoryFeatureFlagBits.html):

[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_KHR](VkExternalMemoryFeatureFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_KHR](VkExternalMemoryFeatureFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_KHR](VkExternalMemoryFeatureFlagBits.html)

Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES_KHR](VkStructureType.html)

1) Why do so many external memory capabilities need to be queried on a
per-memory-handle-type basis?

This is because some handle types are based on OS-native objects that have
far more limited capabilities than the very generic Vulkan memory objects.
Not all memory handle types can name memory objects that support 3D images,
for example.
Some handle types cannot even support the deferred image and memory binding
behavior of Vulkan and require specifying the image when allocating or
importing the memory object.

2) Do the [VkExternalImageFormatPropertiesKHR](VkExternalImageFormatProperties.html) and
[VkExternalBufferPropertiesKHR](VkExternalBufferProperties.html) structs need to include a list of memory
type bits that support the given handle type?

No.
The memory types that do not support the handle types will simply be
filtered out of the results returned by [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html)
and [vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html) when a set of handle types was
specified at image or buffer creation time.

3) Should the non-opaque handle types be moved to their own extension?

Perhaps.
However, defining the handle type bits does very little and does not require
any platform-specific types on its own, and it is easier to maintain the
bitfield values in a single extension for now.
Presumably more handle types could be added by separate extensions though,
and it would be midly weird to have some platform-specific ones defined in
the core spec and some in extensions

4) Do we need a `D3D11_TILEPOOL` type?

No.
This is technically possible, but the synchronization is awkward.
D3D11 surfaces must be synchronized using shared mutexes, and these
synchronization primitives are shared by the entire memory object, so D3D11
shared allocations divided among multiple buffer and image bindings may be
difficult to synchronize.

5) Should the Windows 7-compatible handle types be named “KMT” handles or
“GLOBAL_SHARE” handles?

KMT, simply because it is more concise.

6) How do applications identify compatible devices and drivers across
instance, process, and API boundaries when sharing memory?

New device properties are exposed that allow applications to correctly
correlate devices and drivers.
A device and driver UUID that must both match to ensure sharing
compatibility between two Vulkan instances, or a Vulkan instance and an
extensible external API are added.
To allow correlating with Direct3D devices, a device LUID is added that
corresponds to a DXGI adapter LUID.
A driver ID is not needed for Direct3D because mismatched driver component
versions are not currently supported on the Windows OS.
Should support for such configurations be introduced at the OS level,
further Vulkan extensions would be needed to correlate userspace component
builds.

* 
Revision 1, 2016-10-17 (James Jones)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_memory_capabilities).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
