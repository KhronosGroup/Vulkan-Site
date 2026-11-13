# VK_KHR_portability_enumeration(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_portability_enumeration.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_portability_enumeration](#VK_KHR_portability_enumeration)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_portability_enumeration - instance extension

**Name String**

`VK_KHR_portability_enumeration`

**Extension Type**

Instance extension

**Registered Extension Number**

395

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Charles Giessen [charles-lunarg](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_portability_enumeration] @charles-lunarg%0A*Here describe the issue or question you have about the VK_KHR_portability_enumeration extension*)

**Last Modified Date**

2021-06-02

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)`

**Contributors**

* 
Lenny Komow, LunarG

* 
Charles Giessen, LunarG

This extension allows applications to control whether devices that expose
the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension are included in the results
of physical device enumeration.
Since devices which support the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension
are not fully conformant Vulkan implementations, the Vulkan loader does not
report those devices unless the application explicitly asks for them.
This prevents applications which may not be aware of non-conformant devices
from accidentally using them, as any device which supports the
`[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension mandates that the extension
must be enabled if that device is used.

This extension is implemented in the loader.

* 
`VK_KHR_PORTABILITY_ENUMERATION_EXTENSION_NAME`

* 
`VK_KHR_PORTABILITY_ENUMERATION_SPEC_VERSION`

* 
Extending [VkInstanceCreateFlagBits](VkInstanceCreateFlagBits.html):

[VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR](VkInstanceCreateFlagBits.html)

* 
Revision 1, 2021-06-02 (Lenny Komow)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_portability_enumeration).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
