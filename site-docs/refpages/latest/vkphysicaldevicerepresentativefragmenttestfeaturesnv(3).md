# VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV - Structure describing the representative fragment test features that can be supported by an implementation

The `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV` structure is
defined as:

// Provided by VK_NV_representative_fragment_test
typedef struct VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           representativeFragmentTest;
} VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `representativeFragmentTest`
indicates whether the implementation supports the representative
fragment test.
See [Representative Fragment Test](../../../../spec/latest/chapters/fragops.html#fragops-rep-frag-test).

If the `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_REPRESENTATIVE_FRAGMENT_TEST_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_representative_fragment_test](VK_NV_representative_fragment_test.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
