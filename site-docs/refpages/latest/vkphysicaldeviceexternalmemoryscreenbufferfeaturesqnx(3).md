# VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX - Structure describing QNX Screen Buffer features that can be supported by an implementation

The `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure is
defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           screenBufferImport;
} VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX;

The members of the
`VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure
describe the following features:

* 
 `screenBufferImport` indicates
whether QNX Screen buffer import functionality is supported.
If `screenBufferImport` is [VK_TRUE](VK_TRUE.html), [VkDeviceMemory](VkDeviceMemory.html)
supports importing `_screen_buffer` from applications.
In this case, the application is responsible for the resource management
of the `_screen_buffer`.

| Features | Functionality |
| --- | --- |
| `screenBufferImport` | [VkImportScreenBufferInfoQNX](VkImportScreenBufferInfoQNX.html) |
| Always supported1 | [vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html), [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html),
[VkExternalFormatQNX](VkExternalFormatQNX.html) |

1

Functionality in this row is always available.

The [Functionality supported for QNX Screen buffer features](../../../../spec/latest/chapters/features.html#features-externalscreenbuffer-table) table summarizes the functionality enabled by the
`VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure.
Each entry in the body of the table summarizes the functionality that **can**
be used when the given features are supported and enabled.
This summarizes Valid Usage statements that are added elsewhere in this
specification.

If the `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX-sType-sType) VUID-VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_SCREEN_BUFFER_FEATURES_QNX](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
