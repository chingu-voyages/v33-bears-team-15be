'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" src=images/logo.png>
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' : 'data-target="#xs-controllers-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' :
                                            'id="xs-controllers-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' : 'data-target="#xs-injectables-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' :
                                        'id="xs-injectables-links-module-AuthModule-c664e05d533ebc03a44ec6de41ca61d8"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorModule.html" data-type="entity-link" >AuthorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' : 'data-target="#xs-controllers-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' :
                                            'id="xs-controllers-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' : 'data-target="#xs-injectables-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' :
                                        'id="xs-injectables-links-module-AuthorModule-81435766102ef5395edc52c91206f0b3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthorRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookModule.html" data-type="entity-link" >BookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' : 'data-target="#xs-controllers-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' :
                                            'id="xs-controllers-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' }>
                                            <li class="link">
                                                <a href="controllers/BookController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' : 'data-target="#xs-injectables-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' :
                                        'id="xs-injectables-links-module-BookModule-4313a15d9a624c1d85fa25d9a1612d74"' }>
                                        <li class="link">
                                            <a href="injectables/BookRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' : 'data-target="#xs-controllers-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' :
                                            'id="xs-controllers-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' : 'data-target="#xs-injectables-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' :
                                        'id="xs-injectables-links-module-CategoryModule-e411557254c0190eaaa38f6029cb6012"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DatabaseModule-35f284afa0d2276d2c58086c9abd05b3"' : 'data-target="#xs-injectables-links-module-DatabaseModule-35f284afa0d2276d2c58086c9abd05b3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-35f284afa0d2276d2c58086c9abd05b3"' :
                                        'id="xs-injectables-links-module-DatabaseModule-35f284afa0d2276d2c58086c9abd05b3"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModule.html" data-type="entity-link" >ReviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' : 'data-target="#xs-controllers-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' :
                                            'id="xs-controllers-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' : 'data-target="#xs-injectables-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' :
                                        'id="xs-injectables-links-module-ReviewModule-ae7dd544b4906d4920507a01edca8827"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReviewService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-89a4cac792b239ac503122c303622830"' : 'data-target="#xs-controllers-links-module-UserModule-89a4cac792b239ac503122c303622830"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-89a4cac792b239ac503122c303622830"' :
                                            'id="xs-controllers-links-module-UserModule-89a4cac792b239ac503122c303622830"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-89a4cac792b239ac503122c303622830"' : 'data-target="#xs-injectables-links-module-UserModule-89a4cac792b239ac503122c303622830"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-89a4cac792b239ac503122c303622830"' :
                                        'id="xs-injectables-links-module-UserModule-89a4cac792b239ac503122c303622830"' }>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorEntity.html" data-type="entity-link" >AuthorEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntitySchema.html" data-type="entity-link" >BaseEntitySchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookEntity.html" data-type="entity-link" >BookEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryEntity.html" data-type="entity-link" >CategoryEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigService.html" data-type="entity-link" >ConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthorDto.html" data-type="entity-link" >CreateAuthorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookDto.html" data-type="entity-link" >CreateBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReadingListDto.html" data-type="entity-link" >CreateReadingListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityRepository.html" data-type="entity-link" >EntityRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessFile.html" data-type="entity-link" >ProcessFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReviewEntity.html" data-type="entity-link" >ReviewEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthorDto.html" data-type="entity-link" >UpdateAuthorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookDto.html" data-type="entity-link" >UpdateBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link" >UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadBookDto.html" data-type="entity-link" >UploadBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiOptions.html" data-type="entity-link" >ApiOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthOptions.html" data-type="entity-link" >AuthOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConnectionOptions.html" data-type="entity-link" >ConnectionOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProcessFile.html" data-type="entity-link" >IProcessFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResizeImageArgs.html" data-type="entity-link" >IResizeImageArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RuntimeSetismConfig.html" data-type="entity-link" >RuntimeSetismConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuperadminCredentials.html" data-type="entity-link" >SuperadminCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwaggerOptions.html" data-type="entity-link" >SwaggerOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});