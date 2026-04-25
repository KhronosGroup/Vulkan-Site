# VK_KHR_robustness2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_robustness2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_robustness2](#VK_KHR_robustness2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_robustness2 - device extension

**Name String**

`VK_KHR_robustness2`

**Extension Type**

Device extension

**Registered Extension Number**

613

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_robustness2] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_robustness2 extension*)

**Last Modified Date**

2025-01-10

**IP Status**

No known IP claims.

**Contributors**

* 
Liam Middlebrook, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension is based on the `[VK_EXT_robustness2](VK_EXT_robustness2.html)` extension.
This extension adds stricter requirements for how out of bounds reads and
writes are handled.
Most accesses **must** be tightly bounds-checked, out of bounds writes **must** be
discarded, out of bound reads **must** return zero.
Rather than allowing multiple possible (0,0,0,x) vectors, the out of
bounds values are treated as zero, and then missing components are inserted
based on the format as described in [Component Substitution](../../../../spec/latest/chapters/images.html#images-component-substitution) and
[vertex input attribute extraction](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input-extraction).

These additional requirements **may** be expensive on some implementations, and
should only be enabled when truly necessary.

This extension also adds support for “null descriptors”, where
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **can** be used instead of a valid handle.
Accesses to null descriptors have well-defined behavior, and do not rely on
robustness.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRobustness2FeaturesKHR](VkPhysicalDeviceRobustness2FeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceRobustness2PropertiesKHR](VkPhysicalDeviceRobustness2PropertiesKHR.html)

* 
`VK_KHR_ROBUSTNESS_2_EXTENSION_NAME`

* 
`VK_KHR_ROBUSTNESS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_KHR](VkStructureType.html)

Why do
[VkPhysicalDeviceRobustness2PropertiesKHR](VkPhysicalDeviceRobustness2PropertiesKHR.html)::`robustUniformBufferAccessSizeAlignment`
and
[VkPhysicalDeviceRobustness2PropertiesKHR](VkPhysicalDeviceRobustness2PropertiesKHR.html)::`robustStorageBufferAccessSizeAlignment`
exist?

**RESOLVED**: Some implementations cannot efficiently tightly bounds-check all
buffer accesses.
Rather, the size of the bound range is padded to some power of two multiple,
up to 256 bytes for uniform buffers and up to 4 bytes for storage buffers,
and that padded size is bounds-checked.
This is sufficient to implement D3D-like behavior, because D3D only allows
binding whole uniform buffers or ranges that are a multiple of 256 bytes,
and D3D raw and structured buffers only support 32-bit accesses.

* 
Revision 1, 2025-01-10 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_robustness2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
