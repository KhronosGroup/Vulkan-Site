# provisional-headers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/provisional-headers.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

provisional-headers - Control inclusion of provisional extensions

*Provisional* extensions **should** not be used in production applications.
The functionality defined by such extensions **may** change in ways that break
backwards compatibility between revisions, and before final release of a
non-provisional version of that extension.

Provisional extensions are defined in a separate *provisional header*,
`vulkan_beta.h`, allowing applications to decide whether or not to include
them.
The mechanism is similar to [window system-specific headers](../../../../spec/latest/appendices/boilerplate.html#boilerplate-wsi-header): before including `vulkan_beta.h`, applications **must** include
`vulkan_core.h`.

|  | Sometimes a provisional extension will include a subset of its interfaces in
| --- | --- |
`vulkan_core.h`.
This may occur if the provisional extension is promoted from an existing
vendor or EXT extension and some of the existing interfaces are defined as
aliases of the provisional extension interfaces.
All other interfaces of that provisional extension which are not aliased
will be included in `vulkan_beta.h`. |

As a convenience for applications, `vulkan.h` conditionally includes
`vulkan_beta.h`.
Applications **can** control inclusion of `vulkan_beta.h` by #defining the
macro `VK_ENABLE_BETA_EXTENSIONS` before including `vulkan.h`.

|  | Starting in version 1.2.171 of the Specification, all provisional enumerants
| --- | --- |
are protected by the macro `VK_ENABLE_BETA_EXTENSIONS`.
Applications needing to use provisional extensions must always define this
macro, even if they are explicitly including `vulkan_beta.h`.
This is a minor change to behavior, affecting only provisional extensions. |

|  | This section describes the purpose of the provisional header independently
| --- | --- |
of the specific provisional extensions which are contained in that header at
any given time.
The extension appendices for provisional extensions note their provisional
status, and link back to this section for more information.
Provisional extensions are intended to provide early access for
bleeding-edge developers, with the understanding that extension interfaces
may change in response to developer feedback.
Provisional extensions are very likely to eventually be updated and released
as non-provisional extensions, but there is no guarantee this will happen,
or how long it will take if it does happen. |

[WSIheaders](WSIheaders.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
