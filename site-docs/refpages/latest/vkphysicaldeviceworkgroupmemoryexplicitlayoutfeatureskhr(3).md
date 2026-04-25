# VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR - Structure describing the workgroup storage explicit layout features that can be supported by an implementation

The `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR` structure
is defined as:

// Provided by VK_KHR_workgroup_memory_explicit_layout
typedef struct VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           workgroupMemoryExplicitLayout;
    VkBool32           workgroupMemoryExplicitLayoutScalarBlockLayout;
    VkBool32           workgroupMemoryExplicitLayout8BitAccess;
    VkBool32           workgroupMemoryExplicitLayout16BitAccess;
} VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`workgroupMemoryExplicitLayout` indicates whether the implementation
supports the SPIR-V `WorkgroupMemoryExplicitLayoutKHR` capability.

* 

`workgroupMemoryExplicitLayoutScalarBlockLayout` indicates whether
the implementation supports scalar alignment for laying out Workgroup
Blocks.

* 

`workgroupMemoryExplicitLayout8BitAccess` indicates whether objects
in the `Workgroup` storage class with the `Block` decoration **can**
have 8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects.
This also indicates whether shader modules **can** declare the
`WorkgroupMemoryExplicitLayout8BitAccessKHR` capability.

* 

`workgroupMemoryExplicitLayout16BitAccess` indicates whether objects
in the `Workgroup` storage class with the `Block` decoration **can**
have 16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects.
This also indicates whether shader modules **can** declare the
`WorkgroupMemoryExplicitLayout16BitAccessKHR` capability.

If the `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_workgroup_memory_explicit_layout](VK_KHR_workgroup_memory_explicit_layout.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
