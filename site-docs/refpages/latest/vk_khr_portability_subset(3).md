# VK_KHR_portability_subset(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_portability_subset.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_portability_subset](#VK_KHR_portability_subset)
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

VK_KHR_portability_subset - device extension

**Name String**

`VK_KHR_portability_subset`

**Extension Type**

Device extension

**Registered Extension Number**

164

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

* 
**This is a *provisional* extension and must** be used with caution.
See the [description](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header) of provisional header files for enablement and stability details.

**Contact**

* 
Bill Hollings [billhollings](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_portability_subset] @billhollings%0A*Here describe the issue or question you have about the VK_KHR_portability_subset extension*)

**Last Modified Date**

2020-07-21

**IP Status**

No known IP claims.

**Contributors**

* 
Bill Hollings, The Brenwill Workshop Ltd.

* 
Daniel Koch, NVIDIA

* 
Dzmitry Malyshau, Mozilla

* 
Chip Davis, CodeWeavers

* 
Dan Ginsburg, Valve

* 
Mike Weiblen, LunarG

* 
Neil Trevett, NVIDIA

* 
Alexey Knyazev, Independent

The `[VK_KHR_portability_subset](#)` extension allows a non-conformant
Vulkan implementation to be built on top of another non-Vulkan graphics API,
and identifies differences between that implementation and a
fully-conformant native Vulkan implementation.

This extension provides Vulkan implementations with the ability to mark
otherwise-required capabilities as unsupported, or to establish additional
properties and limits that the application should adhere to in order to
guarantee portable behavior and operation across platforms, including
platforms where Vulkan is not natively supported.

The goal of this specification is to document, and make queryable,
capabilities which are required to be supported by a fully-conformant Vulkan
1.0 implementation, but may be optional for an implementation of the Vulkan
1.0 Portability Subset.

The intent is that this extension will be advertised only on implementations
of the Vulkan 1.0 Portability Subset, and not on conformant implementations
of Vulkan 1.0.
Fully-conformant Vulkan implementations provide all the required
capabilities, and so will not provide this extension.
Therefore, the existence of this extension can be used to determine that an
implementation is likely not fully conformant with the Vulkan spec.

If this extension is supported by the Vulkan implementation, the application
must enable this extension.

This extension defines several new structures that can be chained to the
existing structures used by certain standard Vulkan calls, in order to query
for non-conformant portable behavior.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePortabilitySubsetPropertiesKHR](VkPhysicalDevicePortabilitySubsetPropertiesKHR.html)

* 
`VK_KHR_PORTABILITY_SUBSET_EXTENSION_NAME`

* 
`VK_KHR_PORTABILITY_SUBSET_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_PROPERTIES_KHR](VkStructureType.html)

None.

* 
Revision 1, 2020-07-21 (Bill Hollings)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_portability_subset).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
