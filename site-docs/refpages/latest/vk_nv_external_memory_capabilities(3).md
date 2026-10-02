# VK_NV_external_memory_capabilities(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_external_memory_capabilities.html

## Table of Contents

- [Name](#_name)
- [VK_NV_external_memory_capabilities](#VK_NV_external_memory_capabilities)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
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

VK_NV_external_memory_capabilities - instance extension

**Name String**

`VK_NV_external_memory_capabilities`

**Extension Type**

Instance extension

**Registered Extension Number**

56

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html)
extension

Which in turn was *promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_external_memory_capabilities] @cubanismo%0A*Here describe the issue or question you have about the VK_NV_external_memory_capabilities extension*)

**Last Modified Date**

2016-08-19

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1.

* 
Interacts with `[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)`.

* 
Interacts with `[VK_NV_dedicated_allocation](VK_NV_dedicated_allocation.html)`.

**Contributors**

* 
James Jones, NVIDIA

Applications may wish to import memory from the Direct 3D API, or export
memory to other Vulkan instances.
This extension provides a set of capability queries that allow applications
determine what types of win32 memory handles an implementation supports for
a given set of use cases.

* 
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)

* 
[VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html)

* 
[VkExternalMemoryFeatureFlagBitsNV](VkExternalMemoryFeatureFlagBitsNV.html)

* 
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html)

* 
[VkExternalMemoryFeatureFlagsNV](VkExternalMemoryFeatureFlagsNV.html)

* 
[VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html)

* 
`VK_NV_EXTERNAL_MEMORY_CAPABILITIES_EXTENSION_NAME`

* 
`VK_NV_EXTERNAL_MEMORY_CAPABILITIES_SPEC_VERSION`

1) Why do so many external memory capabilities need to be queried on a
per-memory-handle-type basis?

**RESOLVED**: This is because some handle types are based on OS-native objects
that have far more limited capabilities than the very generic Vulkan memory
objects.
Not all memory handle types can name memory objects that support 3D images,
for example.
Some handle types cannot even support the deferred image and memory binding
behavior of Vulkan and require specifying the image when allocating or
importing the memory object.

2) Does the [VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html) structure need to
include a list of memory type bits that support the given handle type?

**RESOLVED**: No.
The memory types that do not support the handle types will simply be
filtered out of the results returned by [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html)
when a set of handle types was specified at image creation time.

3) Should the non-opaque handle types be moved to their own extension?

**RESOLVED**: Perhaps.
However, defining the handle type bits does very little and does not require
any platform-specific types on its own, and it is easier to maintain the
bitmask values in a single extension for now.
Presumably more handle types could be added by separate extensions though,
and it would be midly weird to have some platform-specific ones defined in
the core spec and some in extensions

* 
Revision 1, 2016-08-19 (James Jones)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_external_memory_capabilities).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
