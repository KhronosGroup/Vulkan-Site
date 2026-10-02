# VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures - Structure describing support for zero initialization of workgroup memory by an implementation

The `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderZeroInitializeWorkgroupMemory;
} VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures;

// Provided by VK_KHR_zero_initialize_workgroup_memory
// Equivalent to VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures
typedef VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderZeroInitializeWorkgroupMemory` specifies whether the
implementation supports initializing a variable in Workgroup storage
class.

If the `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures-sType-sType) VUID-VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_zero_initialize_workgroup_memory](VK_KHR_zero_initialize_workgroup_memory.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
