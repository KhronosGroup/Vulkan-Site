# VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT - Structure describing whether subpass merging feedback can be supported by the implementation

The `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subpassMergeFeedback;
} VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subpassMergeFeedback` indicates
whether the implementation supports feedback of subpass merging.

If the `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_MERGE_FEEDBACK_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
